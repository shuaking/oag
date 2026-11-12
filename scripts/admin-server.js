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
const crypto = require('crypto');

const CODE_ROOT = path.resolve(__dirname, '..');
// Repository that admin writes to (defaults to this checkout). Overridable for
// tests or for running the admin against another checkout on the same machine.
const REPO_ROOT = process.env.OAG_REPO_ROOT ? path.resolve(process.env.OAG_REPO_ROOT) : CODE_ROOT;
const PUBLIC_DIR = path.join(CODE_ROOT, 'public');
const PAGES_DIR = path.join(CODE_ROOT, 'pages');
const BUILD_SCRIPT = path.join(CODE_ROOT, 'scripts', 'build-pages-data.js');
const CLIENT_ID = (process.env.OAG_GITHUB_CLIENT_ID || '').trim();
const MAX_BODY_BYTES = 64 * 1024;

// Local-mode asset layout (operate on the checked-out repo on this machine).
const TYPE_DIRS = { agent: 'agents', subagent: 'subagents', skill: 'skills', mcp: 'mcp', prompt: 'prompts' };
const MAIN_FILE = { agent: 'AGENT.md', subagent: 'agent.md', skill: 'SKILL.md', mcp: 'mcp.json', prompt: 'PROMPT.md' };
const NAME_PATTERN = /^[a-z0-9][a-z0-9._-]*$/;
const COOKIE_NAME = 'oag_admin_sid';
const sessions = new Map();

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
    sendJson(response, 200, { ok: true, oauthConfigured: Boolean(CLIENT_ID), local: true });
    return true;
  }

  if (pathname === '/api/auth/login') {
    if (request.method !== 'POST') {
      sendJson(response, 405, { error: 'method_not_allowed' });
      return true;
    }
    const body = await readJsonBody(request);
    const token = String(body.token || '').trim();
    if (!token) {
      sendJson(response, 400, { error: 'missing_token', error_description: '缺少访问令牌' });
      return true;
    }
    // Dev/test hook: allows exercising local mode without a real GitHub token.
    const devToken = (process.env.OAG_ADMIN_DEV_TOKEN || '').trim();
    if (devToken && token === devToken) {
      const sid = crypto.randomUUID();
      sessions.set(sid, { token, user: { login: 'dev-user', avatar_url: '' } });
      response.setHeader('set-cookie', `${COOKIE_NAME}=${sid}; HttpOnly; SameSite=Lax; Path=/; Max-Age=86400`);
      sendJson(response, 200, { user: { login: 'dev-user', avatar_url: '' } });
      return true;
    }
    try {
      const upstream = await fetch('https://api.github.com/user', {
        headers: { authorization: `Bearer ${token}`, accept: 'application/vnd.github+json', 'user-agent': 'oag-admin-server' },
      });
      if (!upstream.ok) {
        sendJson(response, 401, { error: 'invalid_token', status: upstream.status, error_description: '令牌无效或无权限' });
        return true;
      }
      const user = await upstream.json();
      const sid = crypto.randomUUID();
      sessions.set(sid, { token, user: { login: user.login, avatar_url: user.avatar_url } });
      response.setHeader('set-cookie', `${COOKIE_NAME}=${sid}; HttpOnly; SameSite=Lax; Path=/; Max-Age=86400`);
      sendJson(response, 200, { user: { login: user.login, avatar_url: user.avatar_url } });
    } catch (error) {
      sendJson(response, 502, { error: 'upstream_failed', error_description: `无法连接 GitHub：${error.message}` });
    }
    return true;
  }

  if (pathname === '/api/auth/logout') {
    const session = getSession(request);
    if (session) sessions.delete(session.sid);
    response.setHeader('set-cookie', `${COOKIE_NAME}=; HttpOnly; SameSite=Lax; Path=/; Max-Age=0`);
    sendJson(response, 200, { ok: true });
    return true;
  }

  if (pathname === '/api/auth/me') {
    const session = getSession(request);
    if (!session) {
      sendJson(response, 401, { error: 'not_authenticated' });
      return true;
    }
    sendJson(response, 200, { user: session.user });
    return true;
  }

  if (pathname === '/api/assets') {
    const session = getSession(request);
    if (!session) {
      sendJson(response, 401, { error: 'not_authenticated' });
      return true;
    }

    if (request.method === 'GET') {
      try {
        const assets = await readLocalAssets();
        sendJson(response, 200, { assets });
      } catch (error) {
        sendJson(response, 500, { error: 'read_failed', error_description: error.message });
      }
      return true;
    }

    if (request.method === 'POST') {
      try {
        const body = await readJsonBody(request);
        const result = await createLocalAsset(body);
        sendJson(response, 200, result);
      } catch (error) {
        sendJson(response, error.statusCode || 400, { error: 'create_failed', error_description: error.message });
      }
      return true;
    }

    if (request.method === 'DELETE') {
      try {
        const body = await readJsonBody(request);
        const result = await deleteLocalAsset(body);
        sendJson(response, 200, result);
      } catch (error) {
        sendJson(response, error.statusCode || 400, { error: 'delete_failed', error_description: error.message });
      }
      return true;
    }

    sendJson(response, 405, { error: 'method_not_allowed' });
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

function getSession(request) {
  const sid = parseCookies(request)[COOKIE_NAME];
  if (!sid) return null;
  const data = sessions.get(sid);
  return data ? { sid, ...data } : null;
}

function parseCookies(request) {
  const header = request.headers.cookie || '';
  const out = {};
  for (const part of header.split(';')) {
    const idx = part.indexOf('=');
    if (idx > 0) out[part.slice(0, idx).trim()] = decodeURIComponent(part.slice(idx + 1).trim());
  }
  return out;
}

function httpError(statusCode, message) {
  const error = new Error(message);
  error.statusCode = statusCode;
  return error;
}

async function pathExists(target) {
  try { await fs.access(target); return true; } catch { return false; }
}

async function listFilesRecursive(rootDir, prefix = '') {
  const out = [];
  const entries = await fs.readdir(path.join(rootDir, prefix), { withFileTypes: true });
  for (const entry of entries) {
    const rel = prefix ? `${prefix}/${entry.name}` : entry.name;
    if (entry.isDirectory()) {
      out.push(...(await listFilesRecursive(rootDir, rel)));
    } else if (entry.isFile()) {
      out.push(rel);
    }
  }
  return out.sort();
}

async function readLocalAssets() {
  const assets = [];
  for (const [type, dir] of Object.entries(TYPE_DIRS)) {
    const typeRoot = path.join(REPO_ROOT, dir);
    let entries;
    try {
      entries = await fs.readdir(typeRoot, { withFileTypes: true });
    } catch {
      continue;
    }
    for (const entry of entries) {
      if (!entry.isDirectory()) continue;
      const assetDir = path.join(typeRoot, entry.name);
      let manifest;
      try {
        manifest = JSON.parse(await fs.readFile(path.join(assetDir, 'asset.json'), 'utf8'));
      } catch {
        continue;
      }
      assets.push({ type, name: entry.name, dir: `${dir}/${entry.name}`, manifest, files: await listFilesRecursive(assetDir) });
    }
  }
  return assets;
}

function assertInsideTypeDir(type, name) {
  if (!TYPE_DIRS[type]) throw httpError(400, `未知类型：${type}`);
  if (typeof name !== 'string' || !NAME_PATTERN.test(name)) {
    throw httpError(400, '名称必须为 kebab-case（小写字母、数字、- . _）');
  }
  const typeRoot = path.join(REPO_ROOT, TYPE_DIRS[type]);
  const assetDir = path.join(typeRoot, name);
  const rel = path.relative(typeRoot, assetDir);
  if (rel.startsWith('..') || path.isAbsolute(rel)) throw httpError(400, '非法资产路径');
  return { typeRoot, assetDir };
}

async function createLocalAsset(body) {
  const type = String(body.type || '');
  const name = String(body.name || '');
  const { assetDir } = assertInsideTypeDir(type, name);
  const mainFile = MAIN_FILE[type];
  const mainContent = typeof body.mainContent === 'string' ? body.mainContent : '';
  if (!mainContent.trim()) throw httpError(400, '主文件内容不能为空');
  if (await pathExists(assetDir)) throw httpError(409, `资产 ${type}/${name} 已存在，请先删除`);

  if (type === 'mcp') {
    try {
      JSON.parse(mainContent);
    } catch (error) {
      throw httpError(400, `mcp.json 不是合法 JSON：${error.message}`);
    }
  }

  const extraFiles = Array.isArray(body.extraFiles) ? body.extraFiles : [];
  const reserved = new Set(['asset.json', mainFile]);
  for (const file of extraFiles) {
    const p = String((file && file.path) || '');
    if (!p || p.startsWith('/') || p.includes('..')) throw httpError(400, `附加文件路径不安全：${p}`);
    if (reserved.has(p)) throw httpError(400, `附加文件路径冲突：${p}`);
    reserved.add(p);
  }

  const tools = Array.isArray(body.tools)
    ? body.tools.filter((tool) => ['claude', 'codex', 'opencode'].includes(tool))
    : [];
  const manifest = { name, type };
  const description = typeof body.description === 'string' ? body.description.trim() : '';
  if (description) manifest.description = description;
  if (tools.length) manifest.tools = tools;
  manifest.files = [{ source: mainFile }, ...extraFiles.map((file) => ({ source: String(file.path) }))];

  await fs.mkdir(assetDir, { recursive: true });
  await fs.writeFile(path.join(assetDir, 'asset.json'), `${JSON.stringify(manifest, null, 2)}\n`, 'utf8');
  await fs.writeFile(path.join(assetDir, mainFile), mainContent, 'utf8');
  for (const file of extraFiles) {
    const target = path.join(assetDir, String(file.path));
    const rel = path.relative(assetDir, target);
    if (rel.startsWith('..') || path.isAbsolute(rel)) throw httpError(400, `附加文件路径不安全：${file.path}`);
    await fs.mkdir(path.dirname(target), { recursive: true });
    await fs.writeFile(target, typeof file.content === 'string' ? file.content : '', 'utf8');
  }

  const commit = await commitAndPush([assetDir], `feat(admin): add ${type}/${name}`);
  return { ok: true, type, name, commit };
}

async function deleteLocalAsset(body) {
  const type = String(body.type || '');
  const name = String(body.name || '');
  const { assetDir } = assertInsideTypeDir(type, name);
  if (!(await pathExists(assetDir))) throw httpError(404, `资产 ${type}/${name} 不存在`);
  await fs.rm(assetDir, { recursive: true, force: true });
  const commit = await commitAndPush([assetDir], `chore(admin): remove ${type}/${name}`);
  return { ok: true, type, name, commit };
}

async function commitAndPush(paths, message) {
  let res = await runGit(['add', '-A', '--', ...paths]);
  if (res.code !== 0) throw httpError(500, `git add 失败：${res.stderr || res.stdout}`);
  res = await runGit(['commit', '-m', message]);
  if (res.code !== 0) {
    if (/nothing to commit|no changes added/i.test(`${res.stdout}\n${res.stderr}`)) {
      return { skipped: true };
    }
    throw httpError(500, `git commit 失败：${res.stderr || res.stdout}`);
  }
  const sha = (await runGit(['rev-parse', 'HEAD'])).stdout.trim();
  const branch = (await runGit(['rev-parse', '--abbrev-ref', 'HEAD'])).stdout.trim();
  const push = await runGit(['push', 'origin', branch]);
  const remote = (await runGit(['remote', 'get-url', 'origin'])).stdout.trim();
  const match = remote.match(/github\.com[/:]([^/]+)\/([^/.]+)/);
  return {
    sha,
    branch,
    message,
    url: match ? `https://github.com/${match[1]}/${match[2]}/commit/${sha}` : null,
    pushed: push.code === 0,
    pushError: push.code === 0 ? null : push.stderr || push.stdout,
  };
}

function runGit(args) {
  return new Promise((resolve, reject) => {
    const child = spawn(process.platform === 'win32' ? 'git.exe' : 'git', args, { cwd: REPO_ROOT, windowsHide: true });
    let stdout = '';
    let stderr = '';
    child.stdout.on('data', (d) => { stdout += d; });
    child.stderr.on('data', (d) => { stderr += d; });
    child.on('error', reject);
    child.on('close', (code) => resolve({ code, stdout, stderr }));
  });
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
    const child = spawn(process.execPath, [BUILD_SCRIPT], { cwd: CODE_ROOT, stdio: 'inherit' });
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
