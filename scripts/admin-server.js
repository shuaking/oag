#!/usr/bin/env node
'use strict';

/*
 * OAG admin backend.
 *
 * Serves the managed admin console (pages/ -> public/) and proxies GitHub's
 * OAuth Device Flow so the browser can use real "Sign in with GitHub" without
 * exposing a client secret or hitting GitHub's CORS restrictions. Commits are
 * made by the browser through the GitHub API with the resulting token.
 *
 * Env:
 *   OAG_GITHUB_CLIENT_ID  OAuth App client id (device flow enabled). Optional:
 *                         without it the admin still works with a PAT.
 *   PORT                  default 4180
 *   HOST                  default 127.0.0.1
 *   OAG_NO_OPEN           set to 1 to skip opening the browser on start
 */

const fs = require('fs/promises');
const path = require('path');
const http = require('http');
const { createReadStream } = require('fs');
const { spawn } = require('child_process');

const REPO_ROOT = path.resolve(__dirname, '..');
const PUBLIC_DIR = path.join(REPO_ROOT, 'public');
const PAGES_DIR = path.join(REPO_ROOT, 'pages');
const BUILD_SCRIPT = path.join(REPO_ROOT, 'scripts', 'build-pages-data.js');
const CLIENT_ID = (process.env.OAG_GITHUB_CLIENT_ID || '').trim();
const MAX_BODY_BYTES = 64 * 1024;

const MIME_TYPES = {
  '.html': 'text/html; charset=utf-8',
  '.css': 'text/css; charset=utf-8',
  '.js': 'application/javascript; charset=utf-8',
  '.json': 'application/json; charset=utf-8',
  '.md': 'text/markdown; charset=utf-8',
  '.txt': 'text/plain; charset=utf-8',
  '.svg': 'image/svg+xml',
  '.png': 'image/png',
  '.jpg': 'image/jpeg',
  '.jpeg': 'image/jpeg',
  '.gif': 'image/gif',
  '.webp': 'image/webp',
  '.ico': 'image/x-icon',
};

async function main() {
  const port = parsePort(process.env.PORT);
  const host = process.env.HOST || '127.0.0.1';

  await runBuildScript();
  await copyPagesToPublic();

  const server = http.createServer((request, response) => {
    route(request, response).catch((error) => {
      console.error(error);
      if (!response.headersSent) {
        sendJson(response, 500, { error: 'internal_error', error_description: error.message });
      } else {
        response.end();
      }
    });
  });

  server.on('error', (error) => {
    if (error && error.code === 'EADDRINUSE') {
      console.error(
        `端口 ${port} 已被占用（可能 preview:pages 或另一个 admin 实例在运行）。` +
          '请关闭占用进程，或用 PORT=4181 npm run admin 换一个端口。',
      );
    } else {
      console.error(`Failed to start admin server: ${error.message}`);
    }
    process.exitCode = 1;
  });

  server.listen(port, host, () => {
    const address = server.address();
    const actualPort = typeof address === 'object' && address ? address.port : port;
    const adminUrl = `http://${host}:${actualPort}/admin.html`;
    console.log(`OAG admin console: ${adminUrl}`);
    console.log(`OAuth device flow: ${CLIENT_ID ? 'enabled' : 'disabled (set OAG_GITHUB_CLIENT_ID to enable)'}`);
    console.log('GitHub API proxy: enabled at /api/github/proxy (browser never calls api.github.com directly)');
    console.log('Press Ctrl+C to stop.');
    if (process.env.OAG_NO_OPEN !== '1') {
      try {
        openExternal(adminUrl);
      } catch (error) {
        console.warn(`Could not open the browser automatically: ${error.message}`);
      }
    }
  });

  process.on('SIGINT', () => {
    server.close(() => process.exit(0));
  });
}

async function route(request, response) {
  const rawUrl = request.url || '/';
  const pathname = decodeURIComponent(rawUrl.split('?')[0]);

  if (pathname.startsWith('/api/')) {
    const handled = await handleApi(request, response, pathname);
    if (!handled) sendJson(response, 404, { error: 'not_found' });
    return;
  }

  await serveStatic(request, response, pathname);
}

async function handleApi(request, response, pathname) {
  if (pathname === '/api/health') {
    sendJson(response, 200, { ok: true, oauthConfigured: Boolean(CLIENT_ID) });
    return true;
  }

  if (pathname === '/api/github/device/code') {
    if (request.method !== 'POST') {
      sendJson(response, 405, { error: 'method_not_allowed' });
      return true;
    }
    if (!CLIENT_ID) {
      sendJson(response, 400, {
        error: 'oauth_not_configured',
        error_description: '未设置 OAG_GITHUB_CLIENT_ID，请使用 PAT 登录或配置 OAuth App。',
      });
      return true;
    }
    const body = await readJsonBody(request);
    const scope = typeof body.scope === 'string' && body.scope.trim() ? body.scope.trim() : 'repo read:user';
    const upstream = await fetch('https://github.com/login/device/code', {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({ client_id: CLIENT_ID, scope }),
    });
    sendJson(response, upstream.status, await upstream.json());
    return true;
  }

  if (pathname === '/api/github/device/token') {
    if (request.method !== 'POST') {
      sendJson(response, 405, { error: 'method_not_allowed' });
      return true;
    }
    if (!CLIENT_ID) {
      sendJson(response, 400, { error: 'oauth_not_configured' });
      return true;
    }
    const body = await readJsonBody(request);
    if (!body.device_code) {
      sendJson(response, 400, { error: 'invalid_request', error_description: 'missing device_code' });
      return true;
    }
    const upstream = await fetch('https://github.com/login/oauth/access_token', {
      method: 'POST',
      headers: { 'content-type': 'application/json', accept: 'application/json' },
      body: JSON.stringify({
        client_id: CLIENT_ID,
        device_code: body.device_code,
        grant_type: 'urn:ietf:params:oauth:grant-type:device_code',
      }),
    });
    sendJson(response, 200, await upstream.json());
    return true;
  }

  if (pathname === '/api/github/proxy') {
    if (request.method !== 'POST') {
      sendJson(response, 405, { error: 'method_not_allowed' });
      return true;
    }
    const token = String(request.headers['x-gh-token'] || '').trim();
    const body = await readJsonBody(request);
    const apiPath = typeof body.path === 'string' ? body.path.trim() : '';
    if (!apiPath.startsWith('/')) {
      sendJson(response, 400, { error: 'invalid_path', error_description: 'path must start with /' });
      return true;
    }
    const method = String(body.method || 'GET').toUpperCase();
    const accept = typeof body.accept === 'string' && body.accept ? body.accept : 'application/vnd.github+json';
    const headers = {
      accept,
      'x-github-api-version': '2022-11-28',
      'user-agent': 'oag-admin-server',
    };
    if (token) headers.authorization = `Bearer ${token}`;
    let payload;
    if (body.body !== undefined && body.body !== null) {
      headers['content-type'] = 'application/json';
      payload = JSON.stringify(body.body);
    }
    try {
      const upstream = await fetch(`https://api.github.com${apiPath}`, { method, headers, body: payload });
      const text = await upstream.text();
      sendJson(response, 200, { status: upstream.status, body: text });
    } catch (error) {
      sendJson(response, 502, { error: 'upstream_failed', error_description: error.message });
    }
    return true;
  }

  if (pathname === '/api/open-external') {
    if (request.method !== 'POST') {
      sendJson(response, 405, { error: 'method_not_allowed' });
      return true;
    }
    const body = await readJsonBody(request);
    const target = typeof body.url === 'string' ? body.url.trim() : '';
    if (!isAllowedExternalUrl(target)) {
      sendJson(response, 400, {
        error: 'invalid_url',
        error_description: '只允许打开 https://github.com/ 下的地址。',
      });
      return true;
    }
    try {
      openExternal(target);
      sendJson(response, 200, { ok: true, url: target });
    } catch (error) {
      sendJson(response, 500, { error: 'open_failed', error_description: error.message });
    }
    return true;
  }

  return false;
}

function isAllowedExternalUrl(value) {
  try {
    const parsed = new URL(value);
    if (parsed.protocol !== 'https:') return false;
    return parsed.hostname === 'github.com' || parsed.hostname === 'www.github.com';
  } catch {
    return false;
  }
}

function openExternal(url) {
  const options = { detached: true, stdio: 'ignore', windowsHide: true };
  if (process.platform === 'win32') {
    const child = spawn('cmd.exe', ['/c', 'start', '', url], options);
    child.unref();
  } else if (process.platform === 'darwin') {
    const child = spawn('open', [url], options);
    child.unref();
  } else {
    const child = spawn('xdg-open', [url], options);
    child.unref();
  }
}

async function serveStatic(request, response, pathname) {
  let relativePath = pathname;
  if (relativePath.endsWith('/')) relativePath += 'index.html';
  if (relativePath === '') relativePath = '/index.html';

  const normalized = path.normalize(relativePath).replace(/^([.][.][/\\])+/, '');
  const filePath = path.join(PUBLIC_DIR, normalized.replace(/^[/\\]+/, ''));

  if (!isPathInside(filePath, PUBLIC_DIR)) {
    response.statusCode = 403;
    response.end('Forbidden');
    return;
  }

  let stat;
  try {
    stat = await fs.stat(filePath);
  } catch {
    response.statusCode = 404;
    response.setHeader('content-type', 'text/plain; charset=utf-8');
    response.end('Not Found');
    return;
  }

  if (stat.isDirectory()) {
    await streamFile(path.join(filePath, 'index.html'), response);
    return;
  }
  await streamFile(filePath, response);
}

async function streamFile(filePath, response) {
  const extension = path.extname(filePath).toLowerCase();
  response.statusCode = 200;
  response.setHeader('content-type', MIME_TYPES[extension] || 'application/octet-stream');
  await new Promise((resolve, reject) => {
    const stream = createReadStream(filePath);
    stream.on('error', reject);
    stream.on('end', resolve);
    stream.pipe(response);
  }).catch(() => {
    response.statusCode = 404;
    response.setHeader('content-type', 'text/plain; charset=utf-8');
    response.end('Not Found');
  });
}

function sendJson(response, statusCode, payload) {
  if (response.headersSent) return;
  const body = Buffer.from(`${JSON.stringify(payload)}\n`, 'utf8');
  response.statusCode = statusCode;
  response.setHeader('content-type', 'application/json; charset=utf-8');
  response.setHeader('cache-control', 'no-store');
  response.end(body);
}

function readJsonBody(request) {
  return new Promise((resolve, reject) => {
    const chunks = [];
    let size = 0;
    request.on('data', (chunk) => {
      size += chunk.length;
      if (size > MAX_BODY_BYTES) {
        reject(new Error('request body too large'));
        request.destroy();
        return;
      }
      chunks.push(chunk);
    });
    request.on('end', () => {
      const raw = Buffer.concat(chunks).toString('utf8').trim();
      if (!raw) {
        resolve({});
        return;
      }
      try {
        resolve(JSON.parse(raw));
      } catch {
        reject(new Error('invalid JSON body'));
      }
    });
    request.on('error', reject);
  });
}

function parsePort(envPort) {
  const fallback = 4180;
  if (!envPort) return fallback;
  const parsed = Number.parseInt(envPort, 10);
  if (!Number.isInteger(parsed) || parsed <= 0 || parsed > 65535) {
    throw new Error(`Invalid PORT: ${envPort}`);
  }
  return parsed;
}

async function runBuildScript() {
  await new Promise((resolve, reject) => {
    const child = spawn(process.execPath, [BUILD_SCRIPT], { cwd: REPO_ROOT, stdio: 'inherit' });
    child.on('error', reject);
    child.on('exit', (code) => {
      if (code === 0) resolve();
      else reject(new Error(`build-pages-data exited with code ${code}`));
    });
  });
}

async function copyPagesToPublic() {
  await fs.mkdir(PUBLIC_DIR, { recursive: true });
  await fs.cp(PAGES_DIR, PUBLIC_DIR, { recursive: true, force: true });
}

function isPathInside(targetPath, parentPath) {
  const relative = path.relative(parentPath, targetPath);
  return relative === '' || (!relative.startsWith('..') && !path.isAbsolute(relative));
}

main().catch((error) => {
  console.error(error);
  process.exitCode = 1;
});
