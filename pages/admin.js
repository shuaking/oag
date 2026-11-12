/* OAG Admin Console — GitHub-authenticated asset management (agents, subagents, skills, MCP, prompts) */
'use strict';

(() => {
  const TYPE_META = {
    agent: { dir: 'agents', mainFile: 'AGENT.md', hint: '智能体的系统提示（Markdown）。' },
    subagent: { dir: 'subagents', mainFile: 'agent.md', hint: '含 name/description front matter，正文为系统提示。' },
    skill: { dir: 'skills', mainFile: 'SKILL.md', hint: '技能说明与触发规则（Markdown），可在附加文件放置 references/。' },
    mcp: { dir: 'mcp', mainFile: 'mcp.json', hint: 'MCP 服务配置（JSON 对象），例如 { "mcpServers": { ... } }。' },
    prompt: { dir: 'prompts', mainFile: 'PROMPT.md', hint: '可复用提示词（Markdown）。' },
  };
  const TOOLS = ['claude', 'codex', 'opencode'];
  const REPO_KEY = 'oag-admin-repo';
  const TOKEN_KEY = 'oag-admin-token';
  const CFG = Object.assign({ owner: 'shuaking', repo: 'oag', branch: 'main' }, window.OAG_ADMIN_CONFIG || {});

  const state = {
    token: '',
    user: null,
    repo: loadRepo(),
    assets: [],
    activeType: 'all',
    serverMode: false,
    serverOauth: false,
    busy: false,
    deviceCancel: false,
  };

  const $ = (id) => document.getElementById(id);
  const el = {};

  document.addEventListener('DOMContentLoaded', init);

  async function init() {
    cacheElements();
    bindEvents();
    fillRepoInputs();
    updateTypeFileUi();
    updateAuthUi();
    await detectServer();

    const savedToken = safeSessionGet(TOKEN_KEY);
    if (savedToken) {
      try {
        await loginWithToken(savedToken, { silent: true });
      } catch {
        state.user = null;
        state.token = '';
        safeSessionSet(TOKEN_KEY, '');
      }
    }
    updateAuthUi();
  }

  function cacheElements() {
    const ids = [
      'hostBadge', 'topDeviceLoginBtn', 'userChip', 'userAvatar', 'userName', 'logoutBtn',
      'ownerInput', 'repoInput', 'branchInput', 'repoHint',
      'patBox', 'patInput', 'patLoginBtn', 'deviceBox', 'deviceLoginBtn',
      'statusLog', 'headInfo',
      'assetTotal', 'typeFilters', 'refreshBtn', 'loginGate', 'assetLoading', 'assetList',
      'createGate', 'createForm', 'typeSelect', 'nameInput', 'descInput', 'toolToggles',
      'mainFileName', 'mainFileHint', 'mainContent', 'addExtraBtn', 'extraFiles',
      'manifestPreview', 'submitBtn', 'resetFormBtn', 'formStatus',
      'deviceModal', 'deviceUri', 'deviceCode', 'deviceStatus', 'deviceCancelBtn', 'toast',
      'viewList', 'viewCreate',
    ];
    ids.forEach((id) => { el[id] = $(id); });
  }

  function bindEvents() {
    document.querySelectorAll('.tab').forEach((tab) => {
      tab.addEventListener('click', () => switchTab(tab.dataset.tab));
    });

    el.typeFilters.addEventListener('click', (event) => {
      const chip = event.target.closest('.chip');
      if (!chip) return;
      state.activeType = chip.dataset.type || 'all';
      el.typeFilters.querySelectorAll('.chip').forEach((c) => {
        c.classList.toggle('is-active', c === chip);
      });
      renderAssets();
    });

    el.patLoginBtn.addEventListener('click', () => {
      const token = el.patInput.value.trim();
      if (!token) {
        setStatus('请输入个人访问令牌（PAT）。', 'error');
        return;
      }
      loginWithToken(token).catch((error) => {
        setStatus(`登录失败：${error.message}`, 'error');
        showToast(`登录失败：${error.message}`, 'error');
      });
    });

    const startDevice = () => startDeviceLogin().catch((error) => {
      setStatus(`设备码登录失败：${error.message}`, 'error');
      showToast(`设备码登录失败：${error.message}`, 'error');
    });
    el.deviceLoginBtn.addEventListener('click', startDevice);
    el.topDeviceLoginBtn.addEventListener('click', startDevice);
    el.deviceCancelBtn.addEventListener('click', () => {
      state.deviceCancel = true;
      el.deviceModal.hidden = true;
    });

    el.logoutBtn.addEventListener('click', logout);
    el.refreshBtn.addEventListener('click', () => reloadAssets().catch(onActionError));

    [el.ownerInput, el.repoInput, el.branchInput].forEach((input) => {
      input.addEventListener('change', saveRepoFromInputs);
    });

    el.typeSelect.addEventListener('change', updateTypeFileUi);
    el.addExtraBtn.addEventListener('click', addExtraRow);
    el.resetFormBtn.addEventListener('click', resetCreateForm);
    el.createForm.addEventListener('submit', submitCreate);
    ['input', 'change'].forEach((evt) => {
      el.createForm.addEventListener(evt, updateManifestPreview);
    });
  }

  /* ---------------- repo config ---------------- */

  function loadRepo() {
    try {
      const raw = window.localStorage.getItem(REPO_KEY);
      if (raw) {
        const parsed = JSON.parse(raw);
        if (parsed && parsed.owner && parsed.repo) {
          return { owner: parsed.owner, repo: parsed.repo, branch: parsed.branch || 'main' };
        }
      }
    } catch {
      /* ignore */
    }
    return { owner: CFG.owner, repo: CFG.repo, branch: CFG.branch || 'main' };
  }

  function fillRepoInputs() {
    el.ownerInput.value = state.repo.owner;
    el.repoInput.value = state.repo.repo;
    el.branchInput.value = state.repo.branch;
    el.repoHint.textContent = `仓库：${state.repo.owner}/${state.repo.repo} · 分支 ${state.repo.branch}`;
  }

  function saveRepoFromInputs() {
    const owner = el.ownerInput.value.trim();
    const repo = el.repoInput.value.trim();
    const branch = el.branchInput.value.trim() || 'main';
    if (!owner || !repo) {
      setStatus('Owner 与 Repo 不能为空。', 'error');
      return;
    }
    state.repo = { owner, repo, branch };
    try {
      window.localStorage.setItem(REPO_KEY, JSON.stringify(state.repo));
    } catch {
      /* ignore */
    }
    fillRepoInputs();
    if (state.token) {
      reloadAssets().catch(onActionError);
    }
  }

  function repoBasePath() {
    return `/repos/${state.repo.owner}/${state.repo.repo}`;
  }

  /* ---------------- auth ---------------- */

  async function detectServer() {
    try {
      const res = await fetch('/api/health', { cache: 'no-store' });
      if (res.ok) {
        const data = await res.json();
        state.serverMode = true;
        state.serverOauth = Boolean(data && data.oauthConfigured);
      } else {
        state.serverMode = false;
        state.serverOauth = false;
      }
    } catch {
      state.serverMode = false;
      state.serverOauth = false;
    }
    updateAuthUi();
  }

  async function loginWithToken(token, { silent = false } = {}) {
    state.token = token.trim();
    if (!silent) setStatus('正在验证令牌…');
    const user = await gh('/user');
    await gh(repoBasePath()); // verify the token can see the repo
    state.user = user;
    safeSessionSet(TOKEN_KEY, state.token);
    updateAuthUi();
    setStatus(`已登录：${user.login}`, 'ok');
    await reloadAssets();
  }

  async function startDeviceLogin() {
    if (!state.serverOauth) {
      throw new Error('当前页面未启用设备码登录，请使用 PAT，或通过 npm run admin 启动后台服务器。');
    }
    state.deviceCancel = false;
    const res = await fetch('/api/github/device/code', {
      method: 'POST',
      headers: { 'content-type': 'application/json' },
      body: JSON.stringify({ scope: 'repo read:user' }),
    });
    const data = await safeJson(res);
    if (!res.ok) {
      throw new Error(data.error_description || data.error || `HTTP ${res.status}`);
    }

    el.deviceCode.textContent = data.user_code || '----';
    el.deviceUri.innerHTML = '';
    const link = document.createElement('a');
    link.href = data.verification_uri || 'https://github.com/login/device';
    link.target = '_blank';
    link.rel = 'noopener';
    link.textContent = data.verification_uri || 'https://github.com/login/device';
    el.deviceUri.appendChild(document.createTextNode('打开 '));
    el.deviceUri.appendChild(link);
    el.deviceStatus.textContent = '等待授权…（已自动轮询）';
    el.deviceModal.hidden = false;

    const token = await pollDeviceToken(data.device_code, Number(data.interval) || 5, Number(data.expires_in) || 900);
    el.deviceModal.hidden = true;
    if (token) await loginWithToken(token);
  }

  async function pollDeviceToken(deviceCode, interval, expiresIn) {
    const startedAt = Date.now();
    let wait = Math.max(5, interval);
    while (!state.deviceCancel) {
      if (Date.now() - startedAt > expiresIn * 1000) {
        throw new Error('设备码已过期，请重试。');
      }
      await sleep(wait * 1000);
      if (state.deviceCancel) return null;
      const res = await fetch('/api/github/device/token', {
        method: 'POST',
        headers: { 'content-type': 'application/json' },
        body: JSON.stringify({ device_code: deviceCode }),
      });
      const data = await safeJson(res);
      if (data && data.access_token) return data.access_token;
      const error = data && data.error;
      if (error === 'authorization_pending') continue;
      if (error === 'slow_down') { wait += 5; continue; }
      if (error === 'expired_token') throw new Error('设备码已过期，请重试。');
      if (error === 'access_denied') throw new Error('授权被拒绝。');
      if (error) throw new Error(data.error_description || error);
    }
    return null;
  }

  function logout() {
    state.token = '';
    state.user = null;
    state.assets = [];
    safeSessionSet(TOKEN_KEY, '');
    el.patInput.value = '';
    el.statusLog.textContent = '已退出。';
    el.statusLog.className = 'status-log';
    el.headInfo.textContent = '';
    el.assetList.innerHTML = '';
    updateAuthUi();
  }

  /* ---------------- GitHub API ---------------- */

  async function gh(path, { method = 'GET', body, accept } = {}) {
    const headers = {
      Accept: accept || 'application/vnd.github+json',
      'X-GitHub-Api-Version': '2022-11-28',
    };
    if (state.token) headers.Authorization = `Bearer ${state.token}`;
    const res = await fetch(`https://api.github.com${path}`, {
      method,
      headers,
      body: body ? JSON.stringify(body) : undefined,
    });
    const data = await safeJson(res);
    if (!res.ok) {
      const message = (data && data.message) || res.statusText || `HTTP ${res.status}`;
      throw new Error(`GitHub ${res.status}: ${message}`);
    }
    return data;
  }

  async function ghRaw(path) {
    const headers = { Accept: 'application/vnd.github.raw+json', 'X-GitHub-Api-Version': '2022-11-28' };
    if (state.token) headers.Authorization = `Bearer ${state.token}`;
    const res = await fetch(`https://api.github.com${path}`, { headers });
    if (!res.ok) {
      throw new Error(`GitHub ${res.status}`);
    }
    return res.text();
  }

  function encodePath(pathValue) {
    return pathValue.split('/').map(encodeURIComponent).join('/');
  }

  /* ---------------- assets read ---------------- */

  async function reloadAssets() {
    if (!state.token) return;
    el.loginGate.hidden = true;
    el.assetLoading.hidden = false;
    el.assetList.hidden = true;
    try {
      const tree = await gh(`/git/trees/${encodeURIComponent(state.repo.branch)}?recursive=1`);
      const nodes = (tree && tree.tree) || [];
      const assets = [];

      for (const [type, meta] of Object.entries(TYPE_META)) {
        const prefix = `${meta.dir}/`;
        const names = new Set();
        for (const node of nodes) {
          if (node.type !== 'blob' || typeof node.path !== 'string') continue;
          if (!node.path.startsWith(prefix)) continue;
          const rest = node.path.slice(prefix.length).split('/');
          if (rest.length === 2 && rest[1] === 'asset.json') names.add(rest[0]);
        }
        for (const name of names) {
          let manifest = null;
          try {
            const raw = await ghRaw(
              `${repoBasePath()}/contents/${encodePath(`${meta.dir}/${name}/asset.json`)}?ref=${encodeURIComponent(state.repo.branch)}`,
            );
            manifest = JSON.parse(raw);
          } catch {
            manifest = null;
          }
          const files = [];
          const assetPrefix = `${meta.dir}/${name}/`;
          for (const node of nodes) {
            if (node.type === 'blob' && typeof node.path === 'string' && node.path.startsWith(assetPrefix)) {
              files.push(node.path.slice(assetPrefix.length));
            }
          }
          assets.push({
            type,
            name,
            dir: `${meta.dir}/${name}`,
            manifest: manifest || {},
            files: files.sort(),
          });
        }
      }

      state.assets = assets.sort((a, b) => (a.type === b.type ? a.name.localeCompare(b.name) : a.type.localeCompare(b.type)));
      el.assetList.hidden = false;
      renderAssets();
      await updateHeadInfo();
      setStatus(`已读取 ${assets.length} 个资产。`, 'ok');
    } catch (error) {
      el.assetList.hidden = false;
      el.assetList.innerHTML = '';
      renderEmpty(`读取失败：${error.message}`);
      setStatus(`读取失败：${error.message}`, 'error');
      throw error;
    } finally {
      el.assetLoading.hidden = true;
    }
  }

  async function updateHeadInfo() {
    try {
      const commit = await gh(`${repoBasePath()}/commits/${encodeURIComponent(state.repo.branch)}`);
      const sha = commit.sha || '';
      const short = sha.slice(0, 7);
      const msg = (commit.commit && commit.commit.message || '').split('\n')[0];
      el.headInfo.innerHTML = '';
      const link = document.createElement('a');
      link.href = commit.html_url || `https://github.com/${state.repo.owner}/${state.repo.repo}/commit/${sha}`;
      link.target = '_blank';
      link.rel = 'noopener';
      link.textContent = short;
      el.headInfo.appendChild(document.createTextNode('HEAD '));
      el.headInfo.appendChild(link);
      el.headInfo.appendChild(document.createTextNode(` · ${msg}`));
    } catch {
      el.headInfo.textContent = '';
    }
  }

  /* ---------------- assets render ---------------- */

  function renderAssets() {
    el.assetTotal.textContent = String(state.assets.length);
    el.assetList.innerHTML = '';

    if (state.assets.length === 0) {
      renderEmpty('仓库里还没有任何资产，去「新增资产」创建第一个吧。');
      return;
    }

    const types = state.activeType === 'all' ? Object.keys(TYPE_META) : [state.activeType];
    let shown = 0;

    for (const type of types) {
      const items = state.assets.filter((asset) => asset.type === type);
      if (items.length === 0) continue;
      shown += items.length;

      const group = document.createElement('div');
      group.className = 'type-group';

      const head = document.createElement('div');
      head.className = 'type-group-head';
      head.innerHTML = `<span>${TYPE_META[type].dir}</span> <span class="count">${items.length}</span>`;
      group.appendChild(head);

      items.forEach((asset) => group.appendChild(renderRow(asset)));
      el.assetList.appendChild(group);
    }

    if (shown === 0) {
      renderEmpty('当前筛选下没有资产。');
    }
  }

  function renderRow(asset) {
    const row = document.createElement('div');
    row.className = 'asset-row';

    const manifest = asset.manifest || {};
    const tools = Array.isArray(manifest.tools) && manifest.tools.length ? manifest.tools : ['不限'];
    const description = typeof manifest.description === 'string' ? manifest.description : '';

    const main = document.createElement('div');
    main.className = 'asset-main';

    const title = document.createElement('div');
    title.className = 'asset-title';
    const name = document.createElement('span');
    name.className = 'asset-name';
    name.textContent = asset.name;
    const tag = document.createElement('span');
    tag.className = `type-tag t-${asset.type}`;
    tag.textContent = asset.type;
    title.appendChild(name);
    title.appendChild(tag);
    main.appendChild(title);

    const desc = document.createElement('div');
    desc.className = 'asset-desc';
    desc.textContent = description || '（无描述）';
    main.appendChild(desc);

    const meta = document.createElement('div');
    meta.className = 'asset-meta';
    const dirSpan = document.createElement('span');
    dirSpan.textContent = asset.dir;
    const toolSpan = document.createElement('span');
    toolSpan.className = 'tools';
    toolSpan.textContent = `tools: ${tools.join(', ')}`;
    const fileSpan = document.createElement('span');
    fileSpan.textContent = `${asset.files.length} file(s)`;
    meta.appendChild(dirSpan);
    meta.appendChild(toolSpan);
    meta.appendChild(fileSpan);
    main.appendChild(meta);

    const actions = document.createElement('div');
    actions.className = 'asset-actions';
    const delBtn = document.createElement('button');
    delBtn.type = 'button';
    delBtn.className = 'btn btn-mini btn-danger';
    delBtn.textContent = '删除';
    delBtn.addEventListener('click', () => deleteAsset(asset));
    actions.appendChild(delBtn);

    row.appendChild(main);
    row.appendChild(actions);
    return row;
  }

  function renderEmpty(message) {
    const empty = document.createElement('div');
    empty.className = 'gate';
    const p = document.createElement('p');
    p.className = 'gate-copy';
    p.textContent = message;
    empty.appendChild(p);
    el.assetList.appendChild(empty);
  }

  /* ---------------- delete ---------------- */

  async function deleteAsset(asset) {
    const ok = window.confirm(
      `确定删除 ${asset.type}/${asset.name}？\n\n该操作会从 ${state.repo.owner}/${state.repo.repo} 删除其全部文件并创建一次提交。`,
    );
    if (!ok) return;

    setBusy(true);
    setStatus(`正在删除 ${asset.type}/${asset.name}…`);
    try {
      const tree = await gh(`/git/trees/${encodeURIComponent(state.repo.branch)}?recursive=1`);
      const prefix = `${asset.dir}/`;
      const deletes = ((tree && tree.tree) || [])
        .filter((node) => node.type === 'blob' && typeof node.path === 'string' && node.path.startsWith(prefix))
        .map((node) => node.path);
      if (deletes.length === 0) {
        throw new Error('未找到该资产的文件（可能已被删除）。');
      }
      const commit = await commitChanges({
        message: `chore(admin): remove ${asset.type}/${asset.name}`,
        adds: [],
        deletes,
      });
      await reloadAssets();
      const url = commitUrl(commit);
      setStatus(`已删除 ${asset.type}/${asset.name}。`, 'ok');
      showToast(`已删除 ${asset.type}/${asset.name}`, 'ok', url);
    } catch (error) {
      setStatus(`删除失败：${error.message}`, 'error');
      showToast(`删除失败：${error.message}`, 'error');
    } finally {
      setBusy(false);
    }
  }

  /* ---------------- create ---------------- */

  function switchTab(tabName) {
    document.querySelectorAll('.tab').forEach((tab) => {
      const active = tab.dataset.tab === tabName;
      tab.classList.toggle('is-active', active);
      tab.setAttribute('aria-selected', String(active));
    });
    el.viewList.hidden = tabName !== 'list';
    el.viewCreate.hidden = tabName !== 'create';
  }

  function updateTypeFileUi() {
    const type = el.typeSelect.value;
    const meta = TYPE_META[type] || TYPE_META.prompt;
    el.mainFileName.textContent = meta.mainFile;
    el.mainFileHint.textContent = meta.hint;
    el.mainContent.placeholder = type === 'mcp'
      ? '{\n  "mcpServers": {\n    "my-server": { "type": "stdio", "command": "npx", "args": ["-y", "@example/mcp-server"] }\n  }\n}'
      : type === 'subagent'
        ? '---\nname: my-subagent\ndescription: 一句话说明\n---\n\n你是……'
        : '在此粘贴资产内容…';
    updateManifestPreview();
  }

  function addExtraRow() {
    const row = document.createElement('div');
    row.className = 'extra-row';
    row.innerHTML = `
      <input type="text" class="extra-path" placeholder="references/notes.md" spellcheck="false" />
      <textarea class="extra-content" spellcheck="false" placeholder="文件内容…"></textarea>
      <button type="button" class="btn btn-mini btn-danger extra-remove">移除</button>
    `;
    row.querySelector('.extra-remove').addEventListener('click', () => {
      row.remove();
      updateManifestPreview();
    });
    row.querySelector('.extra-path').addEventListener('input', updateManifestPreview);
    el.extraFiles.appendChild(row);
    updateManifestPreview();
  }

  function collectExtraFiles() {
    return Array.from(el.extraFiles.querySelectorAll('.extra-row'))
      .map((row) => ({
        path: row.querySelector('.extra-path').value.trim(),
        content: row.querySelector('.extra-content').value,
      }))
      .filter((item) => item.path);
  }

  function checkedTools() {
    return Array.from(el.toolToggles.querySelectorAll('input[type="checkbox"]'))
      .filter((input) => input.checked)
      .map((input) => input.value)
      .filter((tool) => TOOLS.includes(tool));
  }

  function buildManifest() {
    const type = el.typeSelect.value;
    const meta = TYPE_META[type] || TYPE_META.prompt;
    const name = el.nameInput.value.trim();
    const description = el.descInput.value.trim();
    const tools = checkedTools();
    const extra = collectExtraFiles();

    const manifest = { name: name || '<name>', type };
    if (description) manifest.description = description;
    if (tools.length) manifest.tools = tools;
    manifest.files = [{ source: meta.mainFile }, ...extra.map((file) => ({ source: file.path }))];
    return manifest;
  }

  function updateManifestPreview() {
    try {
      el.manifestPreview.textContent = JSON.stringify(buildManifest(), null, 2);
    } catch {
      el.manifestPreview.textContent = '{}';
    }
  }

  function resetCreateForm() {
    el.nameInput.value = '';
    el.descInput.value = '';
    el.mainContent.value = '';
    el.extraFiles.innerHTML = '';
    el.toolToggles.querySelectorAll('input[type="checkbox"]').forEach((input) => {
      input.checked = true;
    });
    el.formStatus.textContent = '';
    el.formStatus.className = 'form-status';
    updateManifestPreview();
  }

  async function submitCreate(event) {
    event.preventDefault();
    if (!state.token) {
      setFormStatus('请先登录。', 'error');
      return;
    }

    const type = el.typeSelect.value;
    const meta = TYPE_META[type];
    const name = el.nameInput.value.trim();
    const content = el.mainContent.value;
    const extra = collectExtraFiles();

    try {
      if (!/^[a-z0-9][a-z0-9._-]*$/.test(name)) {
        throw new Error('名称必须为 kebab-case（小写字母、数字、- . _）。');
      }
      if (!content.trim()) {
        throw new Error('主文件内容不能为空。');
      }
      if (state.assets.some((asset) => asset.type === type && asset.name === name)) {
        throw new Error(`资产 ${type}/${name} 已存在，请先删除后再新增。`);
      }
      if (type === 'mcp') {
        try {
          JSON.parse(content);
        } catch (error) {
          throw new Error(`mcp.json 不是合法 JSON：${error.message}`);
        }
      }
      const reserved = new Set(['asset.json', meta.mainFile]);
      for (const file of extra) {
        if (file.path.startsWith('/') || file.path.includes('..')) {
          throw new Error(`附加文件路径不安全：${file.path}`);
        }
        if (reserved.has(file.path)) {
          throw new Error(`附加文件路径与主文件冲突：${file.path}`);
        }
        if (extra.filter((other) => other.path === file.path).length > 1) {
          throw new Error(`附加文件路径重复：${file.path}`);
        }
        reserved.add(file.path);
      }

      const manifest = buildManifest();
      const adds = [
        { path: `${meta.dir}/${name}/asset.json`, content: `${JSON.stringify(manifest, null, 2)}\n` },
        { path: `${meta.dir}/${name}/${meta.mainFile}`, content },
        ...extra.map((file) => ({ path: `${meta.dir}/${name}/${file.path}`, content: file.content })),
      ];

      setBusy(true);
      setFormStatus('正在提交到 GitHub…');
      const commit = await commitChanges({ message: `feat(admin): add ${type}/${name}`, adds, deletes: [] });
      resetCreateForm();
      switchTab('list');
      await reloadAssets();
      const url = commitUrl(commit);
      showToast(`已创建 ${type}/${name}`, 'ok', url);
      setStatus(`已创建 ${type}/${name}。`, 'ok');
    } catch (error) {
      setFormStatus(error.message, 'error');
      setStatus(`创建失败：${error.message}`, 'error');
      showToast(`创建失败：${error.message}`, 'error');
    } finally {
      setBusy(false);
    }
  }

  /* ---------------- git data commit ---------------- */

  async function commitChanges({ message, adds, deletes }) {
    const ref = await gh(`${repoBasePath()}/git/ref/heads/${encodeURIComponent(state.repo.branch)}`);
    const headSha = ref.object.sha;
    const headCommit = await gh(`${repoBasePath()}/git/commits/${headSha}`);
    const baseTree = headCommit.tree.sha;

    const entries = [];
    for (const file of adds) {
      const blob = await gh(`${repoBasePath()}/git/blobs`, {
        method: 'POST',
        body: { content: toBase64Utf8(file.content), encoding: 'base64' },
      });
      entries.push({ path: file.path, mode: '100644', type: 'blob', sha: blob.sha });
    }
    for (const path of deletes) {
      entries.push({ path, mode: '100644', type: 'blob', sha: null });
    }
    if (entries.length === 0) {
      throw new Error('没有需要提交的变更。');
    }

    const tree = await gh(`${repoBasePath()}/git/trees`, {
      method: 'POST',
      body: { base_tree: baseTree, tree: entries },
    });
    const commit = await gh(`${repoBasePath()}/git/commits`, {
      method: 'POST',
      body: { message, tree: tree.sha, parents: [headSha] },
    });
    await gh(`${repoBasePath()}/git/refs/heads/${encodeURIComponent(state.repo.branch)}`, {
      method: 'PATCH',
      body: { sha: commit.sha, force: false },
    });
    return commit;
  }

  function commitUrl(commit) {
    if (commit && commit.html_url) return commit.html_url;
    const sha = commit && commit.sha ? commit.sha : '';
    return `https://github.com/${state.repo.owner}/${state.repo.repo}/commit/${sha}`;
  }

  /* ---------------- ui helpers ---------------- */

  function updateAuthUi() {
    const authed = Boolean(state.user);

    el.userChip.hidden = !authed;
    if (authed) {
      el.userName.textContent = state.user.login || 'me';
      if (state.user.avatar_url) {
        el.userAvatar.src = state.user.avatar_url;
      }
    }

    const showDevice = !authed && state.serverOauth;
    el.topDeviceLoginBtn.hidden = !showDevice;
    el.deviceBox.hidden = !showDevice;
    el.patBox.hidden = authed;

    if (state.serverMode) {
      el.hostBadge.textContent = state.serverOauth ? '服务端模式 · OAuth 可用' : '服务端模式 · 仅 PAT';
      el.hostBadge.classList.add('is-server');
    } else {
      el.hostBadge.textContent = '静态模式 · PAT 登录';
      el.hostBadge.classList.remove('is-server');
    }

    el.loginGate.hidden = authed;
    el.createGate.hidden = authed;
    el.createForm.hidden = !authed;
    if (!authed) {
      el.assetList.hidden = true;
      el.assetList.innerHTML = '';
    }
  }

  function setStatus(message, kind) {
    el.statusLog.textContent = message;
    el.statusLog.className = 'status-log';
    if (kind === 'error') el.statusLog.classList.add('is-error');
    if (kind === 'ok') el.statusLog.classList.add('is-ok');
  }

  function setFormStatus(message, kind) {
    el.formStatus.textContent = message;
    el.formStatus.className = 'form-status';
    if (kind === 'error') el.formStatus.classList.add('is-error');
    if (kind === 'ok') el.formStatus.classList.add('is-ok');
  }

  function setBusy(busy) {
    state.busy = busy;
    el.refreshBtn.disabled = busy;
    el.submitBtn.disabled = busy;
    el.patLoginBtn.disabled = busy;
    el.deviceLoginBtn.disabled = busy;
    el.topDeviceLoginBtn.disabled = busy;
  }

  let toastTimer = null;
  function showToast(message, kind, url) {
    el.toast.hidden = false;
    el.toast.className = 'toast';
    if (kind === 'error') el.toast.classList.add('is-error');
    if (kind === 'ok') el.toast.classList.add('is-ok');
    el.toast.innerHTML = '';
    el.toast.appendChild(document.createTextNode(message));
    if (url) {
      const link = document.createElement('a');
      link.href = url;
      link.target = '_blank';
      link.rel = 'noopener';
      link.textContent = ' 查看提交 ↗';
      link.style.color = 'inherit';
      link.style.marginLeft = '6px';
      link.style.textDecoration = 'underline';
      el.toast.appendChild(link);
    }
    if (toastTimer) clearTimeout(toastTimer);
    toastTimer = setTimeout(() => { el.toast.hidden = true; }, 6000);
  }

  function onActionError(error) {
    setStatus(error.message, 'error');
    showToast(error.message, 'error');
  }

  /* ---------------- misc ---------------- */

  function safeSessionGet(key) {
    try { return window.sessionStorage.getItem(key) || ''; } catch { return ''; }
  }
  function safeSessionSet(key, value) {
    try {
      if (value) window.sessionStorage.setItem(key, value);
      else window.sessionStorage.removeItem(key);
    } catch { /* ignore */ }
  }
  function sleep(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  async function safeJson(response) {
    const text = await response.text();
    if (!text) return {};
    try { return JSON.parse(text); } catch { return { raw: text }; }
  }
  function toBase64Utf8(value) {
    const bytes = new TextEncoder().encode(value);
    let binary = '';
    bytes.forEach((byte) => { binary += String.fromCharCode(byte); });
    return btoa(binary);
  }
})();
