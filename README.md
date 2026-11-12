# oag

`oag` is a CLI for managing a Git-based AI registry and installing assets into local projects for tools like Claude, Codex, and OpenCode.

## Documentation

- [Chinese README](README.zh.md)
- [Registry Maintenance Guide (English)](docs/add-asset.en.md)
- [Registry Maintenance Guide (Chinese)](docs/add-asset.zh.md)
- [Admin Console Guide (Chinese)](docs/admin.md)

## What oag does

- Connects your local machine to a remote registry repository.
- Syncs the registry automatically before read/apply operations.
- Lets you enable/disable assets interactively (grouped by type), applied to all compatible tools.
- Bundles assets into plugins you can enable side by side.
- Installs files using `copy` or `symlink` mode.
- Tracks installed items per project so updates are repeatable.
- Handles MCP assets for Claude, Codex, and OpenCode config formats.
- Manages `agent`, `subagent`, `skill`, `mcp`, and `prompt` assets.
- Ships a browser-based **admin console** (GitHub login) to add and delete assets.

## Key features

- **Remote registry management** via Git (`clone` on first use, then `fetch + reset`).
- **Tool-aware installs** with built-in path mappings for:
  - Claude
  - Codex
  - OpenCode
- **Interactive selection UI** in `oag install`: pick assets (grouped by type) and plugins in one menu, applied to all compatible tools at once.
- **Plugin bundles**: enable multiple coexisting plugins directly from the `oag install` menu.
- **State-based updates** with `oag update`.
- **MCP support** with format handling:
  - Claude: `.mcp.json`
  - Codex: `.codex/config.toml`
  - OpenCode: `opencode.json`

## Installation

Install from npm:

```bash
npm install -g @wrenfix/oag
```

Verify:

```bash
oag --help
```

## Configuration

Global config path:

- `~/.oag/config.json`

Defaults:

```json
{
  "registryPath": "~/.oag/registry",
  "remote": null
}
```

Minimal config (recommended):

```json
{
  "remote": {
    "url": "https://github.com/<you>/<your-registry>.git",
    "branch": "main"
  }
}
```

Notes:

- Tool path mappings are built into `oag` (not loaded from user config).
- If no remote is configured, `list` / `install` / `update` will prompt for it.

## Quick start (with fork workflow)

1. **Fork your registry repository** (for example on GitHub).
2. **Point `oag` to your fork**:

   ```bash
   oag remote add https://github.com/<you>/<your-registry>.git main
   ```

3. **List available assets**:

   ```bash
   oag list --tool claude
   ```

4. **Install assets and plugins interactively**:

   ```bash
   oag install --mode copy
   ```

   The menu lists asset types plus a `plugins` category; check whatever you want and choose `Save and exit`.

5. **Update installed assets later**:

   ```bash
   oag update
   ```

## Admin console (GitHub login)

The registry ships with a browser admin console at `pages/admin.html` (published as `/admin.html` by the Pages workflow) for adding and deleting assets of every type (`agent`, `subagent`, `skill`, `mcp`, `prompt`) from a form. Every change is committed straight to the repository through the GitHub API (one atomic commit per action), so the Pages data is rebuilt automatically.

Login uses GitHub in one of two ways:

- **Personal access token (PAT)** — works anywhere, including the static GitHub Pages site. Use a fine-grained token with **Contents: Read and write** on this repository (or a classic token with `repo`).
- **OAuth Device Flow** — a real "Sign in with GitHub" flow. Because GitHub's OAuth endpoints reject browser CORS, it needs the bundled backend proxy:

  ```bash
  # 1) Create an OAuth App and enable "Device Flow"; copy its Client ID.
  # 2) Start the admin backend with that Client ID:
  OAG_GITHUB_CLIENT_ID=<client-id> npm run admin   # opens http://127.0.0.1:4180/admin.html
  ```

`npm run admin` starts the backend and opens the console in your default browser (set `OAG_NO_OPEN=1` to skip). With token login, an empty token box (or the "open GitHub" button) launches GitHub's token page in your local browser.

See [docs/admin.md](docs/admin.md) for setup, fields, and security notes.

## Commands

### `oag remote add <url> [branch]`

Save the remote registry location.

Example:

```bash
oag remote add https://github.com/<you>/<your-registry>.git main
```

### `oag list [--type <type>] [--tool <name>]`

List assets from the synced registry.

Options:

- `--type <type>`: filter by type (for example `agent`, `skill`, `mcp`, `prompt`)
- `--tool <name>`: filter by tool compatibility hint (display filter only)

Example:

```bash
oag list --type skill --tool codex
```

### `oag install [--project <path>] [--mode <mode>]`

Interactively select assets (grouped by type) and plugins, then reconcile them across all compatible tools. Each selected asset is installed to every tool that supports it. Plugins appear as a `plugins` category in the same menu; checking a plugin enables its bundled assets, unchecking one disables it. The selection is a full overwrite: whatever is checked at `Save and exit` becomes the installed set.

Options:

- `--project <path>`: project root (default: current directory)
- `--mode <mode>`: `copy` or `symlink` (default: `copy`)

Example:

```bash
oag install --project . --mode symlink
```

Plugins whose assets are missing from the registry or apply to no configured tool are shown as unavailable (disabled) in the menu. A plugin already enabled but no longer resolvable is preserved as-is rather than being dropped.

### `oag update [--project <path>] [--mode <mode>]`

Reinstall the currently managed assets at the latest registry commit.

Options:

- `--project <path>`: project root (default: current directory)
- `--mode <mode>`: force mode for this run (`copy` or `symlink`)

Example:

```bash
oag update
```

## How oag works

### 1) Registry sync

Before `list`, `install`, and `update`, `oag` syncs your configured registry:

- first run: clone into `~/.oag/registry/repo` (or your custom `registryPath`)
- later runs: fetch remote, hard reset to configured branch, clean untracked files

### 2) Install targets (built-in)

`oag` has built-in mappings for where each asset type is written. Assets are applied to all compatible tools.

**Claude**

- `agent` -> `CLAUDE.md`
- `subagent` -> `.claude/agents/<name>.md`
- `skill` -> `.claude/skills/`
- `mcp` -> `.mcp.json`
- `prompt` -> `.claude/prompts/<name>.md`

**Codex**

- `agent` -> `AGENTS.md`
- `subagent` -> `.codex/agents/<name>.toml` (converted from Markdown)
- `skill` -> `.codex/skills/`
- `mcp` -> `.codex/config.toml`
- `prompt` -> `.codex/prompts/<name>.md`

**OpenCode**

- `agent` -> `AGENTS.md`
- `subagent` -> `.opencode/agents/<name>.md`
- `skill` -> `.opencode/skills/`
- `mcp` -> `opencode.json`
- `prompt` -> `.opencode/prompts/<name>.md`

### 3) Project state

Installed results are tracked in:

- `.oag/state.json` (inside your project root)

The state file has the shape `{ manual: [...], plugins: {...}, tools: {...} }`:

- `manual`: individually selected asset IDs (the non-plugin checkboxes in `oag install`).
- `plugins`: enabled plugins and the assets each one contributes (the `plugins` category in `oag install`).
- `tools`: the real per-tool installation records.

The desired asset set is the union of `manual` and every enabled plugin. `update` uses this state to know what should be refreshed and where.

## Plugin file format

Plugin files live under `plugins/*.json` in your registry repo and use a flat schema.

Example:

```json
{
  "name": "oag-starter",
  "description": "Project starter plugin for oag",
  "assets": [
    "agent/develop-agent",
    "subagent/code-reviewer",
    "mcp/context7",
    "mcp/chrome-devtools",
    "skill/commit",
    "skill/frontend-design",
    "skill/skill-creator"
  ]
}
```

Notes:

- Asset IDs use `type/name` format.
- `name` is required and must be unique; `description` is optional.
- `assets` must list at least one asset ID; each asset is installed to every compatible tool.
- Plugins coexist: enabling multiple plugins installs the union of their assets. Deselecting one plugin only removes the assets that are no longer required by any enabled plugin or by an individual `oag install` selection.

## MCP notes

For `mcp` assets, `oag` applies config updates instead of simple file copies:

- For Claude, servers are merged into `.mcp.json`.
- For Codex, servers are written under `mcp_servers` in `.codex/config.toml`.
- For OpenCode, servers are written into the `mcp` object in `opencode.json` (for example, `{ "mcp": { "context7": { ... } } }`).
- Legacy OpenCode `mcp` array format is migrated to object format during install/update.
- During reinstall/update, `oag` uses stored state to rollback/reapply managed MCP entries safely.

## Subagent notes

`subagent` assets ship a single Markdown file with minimal front matter (`name`
and `description`) and the system prompt as the body:

- For Claude and OpenCode, the Markdown file is copied verbatim to
  `.claude/agents/<name>.md` / `.opencode/agents/<name>.md`.
- For Codex, whose subagents are TOML, `oag` converts the source to
  `.codex/agents/<name>.toml`, mapping only `name`, `description`, and
  `developer_instructions` (the body).
- `model` and `tools`/permissions are intentionally not defined, because those
  fields differ per tool. Each tool falls back to inheriting the parent/main
  session's model and tools. Set tool-specific fields in the source only if you
  need them (they pass through for the Markdown tools and are ignored by Codex).
- A subagent asset must contain exactly one file.

## Troubleshooting

- **Error: `No remote configured.`**
  - Run `oag remote add <url> [branch]` first.
- **Error: `Type 'hook' has been removed and is no longer supported.`**
  - `hook` is deprecated and cannot be listed/installed as a new type.
- **Error: `Invalid mode '<mode>'. Use symlink or copy.`**
  - Choose `--mode copy` or `--mode symlink`.
- **A plugin shows as `(unavailable: ...)` and cannot be checked in `oag install`.**
  - One or more of the plugin's assets do not exist in the registry, or are not applicable to any configured tool. Fix the reported asset IDs in its `plugins/*.json`.
- **Error: `Invalid plugin: ... (invalid asset ID '...', expected type/name)`**
  - Use `type/name` format for each asset ID (for example `skill/commit`).
- **`oag plugin` / `oag preset` / `oag list-presets` no longer exist.**
  - Plugins are now selected inside `oag install` (a `plugins` category in its menu). There is no separate `plugin` command.
