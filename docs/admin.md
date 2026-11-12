# OAG 管理后台（Admin Console）

管理后台用于在浏览器里直接维护资产仓库中的 `agent` / `subagent` / `skill` / `mcp` / `prompt` 资产：查看、按字段新增、删除。所有变更都通过 GitHub API 以一次原子提交写入仓库，随后现有的 GitHub Pages 工作流会重新生成展示站数据。

- 页面：`pages/admin.html`（构建后随展示站一起发布，路径为 `/admin.html`）
- 代码：`pages/admin.js`、`pages/admin.css`、`pages/admin-config.js`
- 可选后台服务：`scripts/admin-server.js`（`npm run admin`）

## 1. 登录方式

后台用 GitHub 进入，支持两种方式：

### 1.1 个人访问令牌（PAT）—— 任意环境可用

1. 在 GitHub → Settings → Developer settings → Personal access tokens 创建一个令牌。
   - 细粒度令牌（Fine-grained）：只授权目标仓库，权限选 **Contents: Read and write**。
   - 经典令牌（Classic）：勾选 `repo`。
2. 打开后台页面，在左侧「GitHub 登录」里粘贴令牌，点击「用令牌登录」。

令牌只保存在当前浏览器的 `sessionStorage`，关闭标签页即失效，不会写入仓库或提交历史。

### 1.2 GitHub OAuth 设备码登录 —— 需要后台服务

浏览器直连 GitHub 的 OAuth 端点会被 CORS 拦截，因此设备码登录需要一个同源的后台服务做代理。`scripts/admin-server.js` 提供了这个代理（只代理设备码请求，不保存任何密钥或令牌）。

1. 在 GitHub → Settings → Developer settings → OAuth Apps → New OAuth App 创建一个应用：
   - Homepage URL 可填你的站点地址；
   - 在应用设置里勾选 **Enable Device Flow**；
   - 记下 **Client ID**（设备码流程不需要 Client Secret）。
2. 启动后台服务并注入 Client ID：

   ```bash
   # Windows PowerShell
   $env:OAG_GITHUB_CLIENT_ID="你的 Client ID"
   npm run admin
   # 默认打开 http://127.0.0.1:4173/admin.html
   ```

   ```bash
   # macOS / Linux
   OAG_GITHUB_CLIENT_ID=你的ClientID npm run admin
   ```

3. 页面右上角会显示「服务端模式 · OAuth 可用」，点击「使用 GitHub 登录」，按提示在 `https://github.com/login/device` 输入一次性代码即可。

> 部署在 GitHub Pages 上的纯静态站点没有后台服务，因此只能使用 PAT 登录；设备码登录适用于你自行运行/托管后台服务的场景。

## 2. 功能

「资产列表」按类型展示仓库现有资产，并可删除；「新增资产」按类型生成字段表单：

| 类型 | 目录 | 主文件 | 说明 |
| --- | --- | --- | --- |
| `agent` | `agents/` | `AGENT.md` | 智能体系统提示 |
| `subagent` | `subagents/` | `agent.md` | 含 name/description front matter |
| `skill` | `skills/` | `SKILL.md` | 可附加 `references/` 等文件 |
| `mcp` | `mcp/` | `mcp.json` | 必须是合法 JSON |
| `prompt` | `prompts/` | `PROMPT.md` | 可复用提示词 |

新增表单的字段：

- **名称**：kebab-case（小写字母、数字、`-` `.` `_`），同时作为资产目录名。
- **描述**：可选，写入 `asset.json` 的 `description`。
- **适用工具**：`claude` / `codex` / `opencode` 多选，留空表示不限制。
- **主文件内容**：该类型的主文件正文；`mcp` 需填写合法 JSON。
- **附加文件**：可选，逐条添加相对路径（如 `references/notes.md`）与内容。

系统会自动生成 `asset.json`（可在页面中实时预览），并把资产目录下的所有文件通过 Git Data API 合并为**一次提交**。删除时同样会一次性删除该资产目录下的全部文件。

## 3. 字段与校验

- `asset.json` 结构：`{ name, type, description?, tools?, files: [{ source }] }`
- `files[].source` 必须位于资产目录内，禁止 `..` 或绝对路径。
- `mcp` 的主文件必须是合法 JSON（例如 `{ "mcpServers": { ... } }`）。
- 若同类型同名资产已存在，新增会被拒绝，请先删除。
- `prompt` / `subagent` 这类扁平安装类型在 `oag` 中要求资产**只包含一个文件**（主文件）。

## 4. 安全说明

- PAT / OAuth 令牌只存在于浏览器会话（`sessionStorage`），不会提交到仓库。
- 后台不包含任何服务端密钥；`admin-server.js` 仅读取 `OAG_GITHUB_CLIENT_ID` 并转发设备码请求。
- 建议使用**细粒度、仅限本仓库、Contents 读写**的令牌，最小化权限。
- 所有写入都可追溯：每次新增/删除都是一次独立提交，可在 GitHub 提交历史中审计。

## 5. 环境变量

| 变量 | 用途 | 默认值 |
| --- | --- | --- |
| `OAG_GITHUB_CLIENT_ID` | 启用 OAuth 设备码登录 | 空（仅 PAT） |
| `PORT` | 后台服务端口 | `4173` |
| `HOST` | 后台服务监听地址 | `127.0.0.1` |
