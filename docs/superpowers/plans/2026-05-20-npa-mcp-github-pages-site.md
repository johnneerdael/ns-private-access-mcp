# NPA MCP GitHub Pages Site Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Build a Hexo/Cactus GitHub Pages documentation site for the Netskope NPA MCP server using the sibling Terraform publisher site as the visual template.

**Architecture:** Copy the existing Hexo site from `../terraform-netskope-publisher/site` into this repository as `site/`, keep the Cactus theme and Netskope image assets, then replace the Terraform content tree with NPA MCP documentation. The site is organized around top-level docs sections: starter, install, operations, and reference. Verification uses Hexo build output plus browser checks against the local dev server.

**Tech Stack:** Hexo 7, `hexo-theme-cactus`, Markdown content pages, npm scripts, GitHub Pages static output.

---

## File Structure

Create or modify these files:

- Create: `site/package.json` copied from the template and renamed to `netskope-npa-mcp-site`.
- Create: `site/_config.yml` copied from the template and updated for `ns-private-access-mcp`.
- Create: `site/_config.cactus.yml` copied from the template and updated with NPA MCP nav.
- Create: `site/source/images/netskope-logo.png`
- Create: `site/source/images/netskope-favicon.ico`
- Create: `site/source/images/netskope-favicon-192x192.png`
- Create: `site/source/images/netskope-apple-touch-icon.png`
- Create: `site/source/_data/page-order.yml`
- Create: `site/source/index.md`
- Create: `site/source/starter/index.md`
- Create: `site/source/starter/01-what-youll-connect.md`
- Create: `site/source/starter/02-prerequisites.md`
- Create: `site/source/starter/03-netskope-token.md`
- Create: `site/source/starter/04-choose-transport.md`
- Create: `site/source/starter/05-configure-first-client.md`
- Create: `site/source/starter/06-verify-tools.md`
- Create: `site/source/starter/07-first-safe-prompts.md`
- Create: `site/source/starter/08-troubleshooting.md`
- Create: `site/source/starter/09-next-steps.md`
- Create: `site/source/install/index.md`
- Create: `site/source/install/claude-desktop.md`
- Create: `site/source/install/claude-code.md`
- Create: `site/source/install/cursor.md`
- Create: `site/source/install/vscode-copilot.md`
- Create: `site/source/install/windsurf.md`
- Create: `site/source/install/codex.md`
- Create: `site/source/install/gemini-cli.md`
- Create: `site/source/install/cline-roo.md`
- Create: `site/source/install/continue.md`
- Create: `site/source/install/zed.md`
- Create: `site/source/install/jetbrains.md`
- Create: `site/source/install/generic-mcp-json.md`
- Create: `site/source/operations/index.md`
- Create: `site/source/operations/hosted-endpoint.md`
- Create: `site/source/operations/docker.md`
- Create: `site/source/operations/local-node.md`
- Create: `site/source/operations/http-server.md`
- Create: `site/source/operations/environment.md`
- Create: `site/source/operations/secret-handling.md`
- Create: `site/source/operations/troubleshooting.md`
- Create: `site/source/reference/index.md`
- Create: `site/source/reference/tool-categories.md`
- Create: `site/source/reference/transport-matrix.md`
- Create: `site/source/reference/config-snippets.md`
- Create: `site/source/reference/security-model.md`
- Create: `site/source/reference/api-token-permissions.md`
- Create: `site/source/reference/status.md`
- Create: `site/source/reference/roadmap.md`
- Modify: `.gitignore` only if `site/public/` or `site/node_modules/` are not already ignored.

Do not modify `netskope-npa-publisher-audit-2026-05-12.md`; it is unrelated untracked work.

---

### Task 1: Copy The Hexo Template

**Files:**
- Create: `site/`
- Modify: `.gitignore` if needed

- [ ] **Step 1: Copy the template site without generated output**

Run:

```bash
rsync -a --exclude public --exclude node_modules --exclude .deploy_git ../terraform-netskope-publisher/site/ site/
```

Expected: `site/package.json`, `site/_config.yml`, `site/_config.cactus.yml`, `site/source/`, and `site/source/images/` exist.

- [ ] **Step 2: Remove copied Terraform content pages**

Run:

```bash
rm -rf site/source/starter site/source/admin site/source/reference site/source/index.md site/source/_data/page-order.yml
```

Expected: the copied image assets remain in `site/source/images/`.

- [ ] **Step 3: Check generated-output ignores**

Run:

```bash
git check-ignore -q site/public && echo "site/public ignored"
git check-ignore -q site/node_modules && echo "site/node_modules ignored"
```

Expected: both commands print their ignored status. If either command prints nothing, add these exact lines to `.gitignore`:

```gitignore
site/public/
site/node_modules/
```

- [ ] **Step 4: Inspect copied files**

Run:

```bash
find site -maxdepth 3 -type f | sort | sed -n '1,160p'
```

Expected: config files and image assets are present; Terraform content pages are removed.

- [ ] **Step 5: Commit template skeleton**

Run:

```bash
git add site .gitignore
git commit -m "Add Hexo site scaffold"
```

Expected: commit succeeds and does not include `site/public/` or `site/node_modules/`.

---

### Task 2: Configure Hexo And Navigation

**Files:**
- Modify: `site/package.json`
- Modify: `site/_config.yml`
- Modify: `site/_config.cactus.yml`
- Create: `site/source/_data/page-order.yml`

- [ ] **Step 1: Update `site/package.json`**

Set the file to:

```json
{
  "name": "netskope-npa-mcp-site",
  "private": true,
  "hexo": {
    "version": "7.3.0"
  },
  "scripts": {
    "build": "hexo generate",
    "serve": "hexo server",
    "clean": "hexo clean"
  },
  "dependencies": {
    "hexo": "^7.3.0",
    "hexo-renderer-ejs": "^2.0.0",
    "hexo-renderer-marked": "^6.3.0",
    "hexo-renderer-stylus": "^3.0.1",
    "hexo-tag-tabs": "^1.0.0",
    "hexo-theme-cactus": "probberechts/hexo-theme-cactus",
    "hexo-toc": "^1.0.0"
  }
}
```

- [ ] **Step 2: Update `site/_config.yml`**

Use this content:

```yaml
title:       Netskope NPA MCP
subtitle:    Manage Netskope Private Access through Model Context Protocol clients
description: Installation, operations, and reference documentation for the Netskope NPA MCP server.
author:      John Neerdael
language:    en
timezone:    Europe/Amsterdam

url:         https://johnneerdael.github.io/ns-private-access-mcp
root:        /ns-private-access-mcp/
permalink:   :title/
permalink_defaults:
pretty_urls:
  trailing_index: false
  trailing_html:  false

source_dir:    source
public_dir:    public
tag_dir:       tags
archive_dir:   archives
category_dir:  categories
code_dir:      downloads/code

default_layout: page
new_post_name:  :title.md

theme: cactus

module_version: v6.3.0
```

- [ ] **Step 3: Update `site/_config.cactus.yml`**

Use this content:

```yaml
colorscheme: dark

logo:
  enabled: true
  width: 120
  height: 61
  url: /images/netskope-logo.png
  gravatar: false
  grayout: false

favicon:
  desktop:
    url: /images/netskope-favicon.ico
    gravatar: false
  android:
    url: /images/netskope-favicon-192x192.png
    gravatar: false
  apple:
    url: /images/netskope-apple-touch-icon.png
    gravatar: false

nav:
  home:       /
  starter:   /starter/
  install:   /install/
  operations: /operations/
  reference: /reference/
  github:    https://github.com/johnneerdael/ns-private-access-mcp

social_links:
  github: johnneerdael

projects:
  enabled: false

posts_overview:
  show_all_posts: false

copyright:
  start_year: 2026
  end_year:   2026
```

- [ ] **Step 4: Create `site/source/_data/page-order.yml`**

Use this content:

```yaml
# Defines linear page ordering within site sections. Keys are relative URLs,
# always trailing slash and prefixed with the GitHub Pages root.

starter:
  - url: /ns-private-access-mcp/starter/01-what-youll-connect/
    title: "1. What you'll connect"
  - url: /ns-private-access-mcp/starter/02-prerequisites/
    title: "2. Prerequisites"
  - url: /ns-private-access-mcp/starter/03-netskope-token/
    title: "3. Netskope token"
  - url: /ns-private-access-mcp/starter/04-choose-transport/
    title: "4. Choose a transport"
  - url: /ns-private-access-mcp/starter/05-configure-first-client/
    title: "5. Configure your first client"
  - url: /ns-private-access-mcp/starter/06-verify-tools/
    title: "6. Verify tools"
  - url: /ns-private-access-mcp/starter/07-first-safe-prompts/
    title: "7. First safe prompts"
  - url: /ns-private-access-mcp/starter/08-troubleshooting/
    title: "8. Troubleshooting"
  - url: /ns-private-access-mcp/starter/09-next-steps/
    title: "9. Next steps"

install:
  - url: /ns-private-access-mcp/install/claude-desktop/
    title: "Claude Desktop"
  - url: /ns-private-access-mcp/install/claude-code/
    title: "Claude Code"
  - url: /ns-private-access-mcp/install/cursor/
    title: "Cursor"
  - url: /ns-private-access-mcp/install/vscode-copilot/
    title: "VS Code / GitHub Copilot"
  - url: /ns-private-access-mcp/install/windsurf/
    title: "Windsurf"
  - url: /ns-private-access-mcp/install/codex/
    title: "Codex"
  - url: /ns-private-access-mcp/install/gemini-cli/
    title: "Gemini CLI"
  - url: /ns-private-access-mcp/install/cline-roo/
    title: "Cline / Roo Code"
  - url: /ns-private-access-mcp/install/continue/
    title: "Continue"
  - url: /ns-private-access-mcp/install/zed/
    title: "Zed"
  - url: /ns-private-access-mcp/install/jetbrains/
    title: "JetBrains AI Assistant / Junie"
  - url: /ns-private-access-mcp/install/generic-mcp-json/
    title: "Generic MCP JSON"
```

- [ ] **Step 5: Commit Hexo configuration**

Run:

```bash
git add site/package.json site/_config.yml site/_config.cactus.yml site/source/_data/page-order.yml
git commit -m "Configure NPA MCP Hexo site"
```

Expected: commit succeeds.

---

### Task 3: Add Home, Starter, Operations, And Reference Pages

**Files:**
- Create: `site/source/index.md`
- Create: `site/source/starter/*.md`
- Create: `site/source/operations/*.md`
- Create: `site/source/reference/*.md`

- [ ] **Step 1: Create the top-level directories**

Run:

```bash
mkdir -p site/source/starter site/source/install site/source/operations site/source/reference site/source/_data
```

Expected: all directories exist.

- [ ] **Step 2: Create `site/source/index.md`**

Include these sections:

```markdown
---
title: Netskope NPA MCP
date: 2026-05-20
---

Netskope NPA MCP is a Model Context Protocol server for managing Netskope Private Access infrastructure from MCP-capable AI clients. It exposes tools for publishers, private apps, local brokers, policies, SCIM identity data, upgrade profiles, steering, alerts, search, and validation.

## Choose your path

| Path | Use when | Start here |
|------|----------|------------|
| Hosted HTTP | You want the quickest client setup and can send tenant URL plus API token as MCP request headers. | [Install guides](/ns-private-access-mcp/install/) |
| Local stdio | Your client launches MCP servers as local commands. | [Starter guide](/ns-private-access-mcp/starter/) |
| Self-hosted HTTP | You want a private endpoint behind your own network controls. | [Operations](/ns-private-access-mcp/operations/) |

## Quick install

Local stdio:

```bash
npm install -g @johnneerdael/ns-private-access-mcp
```

Local HTTP:

```bash
docker run --rm -p 3000:3000 ghcr.io/johnneerdael/privateaccess-mcp:latest
```

## Documentation

- New users: [Starter guide](/ns-private-access-mcp/starter/)
- Client setup: [Install guides](/ns-private-access-mcp/install/)
- Hosting and operations: [Operations](/ns-private-access-mcp/operations/)
- Tool and security details: [Reference](/ns-private-access-mcp/reference/)
```

- [ ] **Step 3: Create starter guide pages**

Create each file with frontmatter `title` and `date: 2026-05-20`. Use these page bodies:

`site/source/starter/index.md`:

```markdown
A linear walkthrough for connecting one MCP client to Netskope NPA MCP and confirming the tools are available.

## In this guide

1. [What you'll connect](/ns-private-access-mcp/starter/01-what-youll-connect/)
2. [Prerequisites](/ns-private-access-mcp/starter/02-prerequisites/)
3. [Netskope token](/ns-private-access-mcp/starter/03-netskope-token/)
4. [Choose a transport](/ns-private-access-mcp/starter/04-choose-transport/)
5. [Configure your first client](/ns-private-access-mcp/starter/05-configure-first-client/)
6. [Verify tools](/ns-private-access-mcp/starter/06-verify-tools/)
7. [First safe prompts](/ns-private-access-mcp/starter/07-first-safe-prompts/)
8. [Troubleshooting](/ns-private-access-mcp/starter/08-troubleshooting/)
9. [Next steps](/ns-private-access-mcp/starter/09-next-steps/)
```

`site/source/starter/01-what-youll-connect.md`:

```markdown
This guide connects an MCP client to a server that can read and manage Netskope Private Access resources. The server provides 84 tools across publishers, private applications, local brokers, policies, SCIM, upgrade profiles, steering, alerts, search, and validation.

The safest first connection is read-oriented: list existing publishers, search private applications, and validate policy references before asking the agent to create or change resources.
```

`site/source/starter/02-prerequisites.md`:

```markdown
You need:

- A Netskope tenant URL such as `https://YOUR-TENANT.goskope.com`
- A Netskope REST API v2 token with NPA permissions
- Node.js 22 or Docker for local/self-hosted modes
- An MCP-capable client

For stdio clients, install the npm package:

```bash
npm install -g @johnneerdael/ns-private-access-mcp
```

For local HTTP, run:

```bash
docker compose up -d
```
```

`site/source/starter/03-netskope-token.md`:

```markdown
Create a Netskope REST API v2 token with only the permissions needed for the workflows you will allow. Store the token in your MCP client config or pass it as an HTTP header.

Environment variable form:

```bash
export NETSKOPE_BASE_URL="https://YOUR-TENANT.goskope.com"
export NETSKOPE_API_TOKEN="YOUR_NETSKOPE_API_TOKEN"
```

HTTP header form:

```http
X-Netskope-Tenant: https://YOUR-TENANT.goskope.com
Authorization: Bearer YOUR_NETSKOPE_API_TOKEN
```

Keep production tokens out of shared repository config. Use user-level MCP config or secret storage for personal credentials.
```

`site/source/starter/04-choose-transport.md`:

```markdown
| Transport | Endpoint shape | Best for |
|-----------|----------------|----------|
| stdio | Client launches `netskope-mcp` locally | Claude Desktop, Claude Code, local-first IDEs |
| Streamable HTTP | Client connects to `/mcp` | Cursor, Windsurf, VS Code, hosted/self-hosted deployments |
| Docker HTTP | Container exposes `/mcp` and `/healthz` | Teams running a controlled internal endpoint |

Prefer stdio when the client expects local subprocess MCP servers. Prefer HTTP when the client supports remote MCP endpoints and you want one shared deployment.
```

`site/source/starter/05-configure-first-client.md`:

```markdown
For a local stdio client, start with this JSON pattern:

```json
{
  "mcpServers": {
    "netskope-npa": {
      "command": "npx",
      "args": ["-y", "@johnneerdael/ns-private-access-mcp"],
      "env": {
        "NETSKOPE_BASE_URL": "https://YOUR-TENANT.goskope.com",
        "NETSKOPE_API_TOKEN": "YOUR_NETSKOPE_API_TOKEN"
      }
    }
  }
}
```

For an HTTP-capable client, use:

```json
{
  "mcpServers": {
    "netskope-npa": {
      "url": "https://privateaccess.ntsk.app/mcp",
      "headers": {
        "X-Netskope-Tenant": "https://YOUR-TENANT.goskope.com",
        "Authorization": "Bearer YOUR_NETSKOPE_API_TOKEN"
      }
    }
  }
}
```

Then open the client-specific page under [Install guides](/ns-private-access-mcp/install/) for the exact location and restart behavior.
```

`site/source/starter/06-verify-tools.md`:

```markdown
After restarting the client, verify that the MCP server is connected and tools are visible.

Safe first prompts:

```text
List the Netskope NPA MCP tools you can see. Do not make changes.
```

```text
Use the Netskope NPA MCP server to list publishers and summarize their status. Do not create, update, or delete anything.
```

If no tools appear, check the client's MCP status panel, local command path, token environment variables, and server logs.
```

`site/source/starter/07-first-safe-prompts.md`:

```markdown
Start with read-only prompts:

```text
Search for private applications related to finance and show their publisher associations.
```

```text
Validate whether existing NPA policies reference SCIM groups that still exist.
```

```text
Summarize publisher upgrade profiles and identify publishers without a profile.
```

For write operations, ask the agent to propose a plan first, then confirm the exact resources it will modify.
```

`site/source/starter/08-troubleshooting.md`:

```markdown
Common startup failures:

| Symptom | Check |
|---------|-------|
| Client shows no tools | Restart the client after editing MCP config. |
| Command not found | Use `npx -y @johnneerdael/ns-private-access-mcp` or install globally. |
| Authentication fails | Confirm tenant URL, token value, and header names. |
| HTTP connection fails | Confirm the endpoint ends in `/mcp` and the server is reachable. |
| Browser client CORS error | Set `CORS_ORIGIN` to the browser client's origin on self-hosted HTTP. |

For local HTTP health:

```bash
curl http://localhost:3000/healthz
```
```

`site/source/starter/09-next-steps.md`:

```markdown
Next steps:

- Configure your daily MCP client from [Install guides](/ns-private-access-mcp/install/).
- Review [Secret handling](/ns-private-access-mcp/operations/secret-handling/) before sharing config.
- Review [Tool categories](/ns-private-access-mcp/reference/tool-categories/) to understand available operations.
- Use read-only prompts before granting agents write-oriented work.
```

- [ ] **Step 4: Create operations pages**

Create the operations index plus individual pages with concrete commands copied from `README.md`, `docker-compose.yml`, and `package.json`.

Required command snippets:

```bash
docker compose up -d
docker compose -f docker-compose.build.yml up --build
npm install
npm run build
PORT=3000 node dist/cli-http.js
curl http://localhost:3000/healthz
```

Required environment table:

```markdown
| Variable | Purpose |
|----------|---------|
| `PORT` / `HOST` | HTTP bind address, defaulting to `0.0.0.0:3000`. |
| `PUBLIC_URL` | Canonical public origin shown in `/healthz` and startup output. |
| `CORS_ORIGIN` | Comma-separated browser origin allowlist. |
| `NETSKOPE_BASE_URL` | Optional fallback tenant URL for single-tenant deployments. |
| `NETSKOPE_API_TOKEN` | Optional fallback token for single-tenant deployments. |
```

- [ ] **Step 5: Create reference pages**

Create the reference index plus pages for tool categories, transport matrix, config snippets, security model, API token permissions, status, and roadmap.

Use this tool category table in `site/source/reference/tool-categories.md`:

```markdown
| Category | Tools | Primary use |
|----------|-------|-------------|
| Publishers | 9 | Infrastructure deployment and management |
| Private Apps | 15 | Application lifecycle and configuration |
| Local Brokers | 7 | Network connectivity and routing |
| Policy Management | 6 | Access control and security rules |
| SCIM Integration | 5 | Identity and user/group lookups |
| Upgrade Profiles | 7 | Maintenance scheduling |
| Steering | 3 | Publisher and application associations |
| Alerts | 2 | Event monitoring |
| Search | 2 | Resource discovery |
| Validation | 2 | Configuration compliance |
```

Use this transport matrix in `site/source/reference/transport-matrix.md`:

```markdown
| Transport | Local command | Remote endpoint | Credentials |
|-----------|---------------|-----------------|-------------|
| stdio | `npx -y @johnneerdael/ns-private-access-mcp` | No | Environment variables |
| local HTTP | `node dist/cli-http.js` or Docker | `http://localhost:3000/mcp` | Headers or fallback env |
| hosted HTTP | No local command | `https://privateaccess.ntsk.app/mcp` | Per-client headers |
```

- [ ] **Step 6: Commit content foundation**

Run:

```bash
git add site/source
git commit -m "Add NPA MCP site content foundation"
```

Expected: commit succeeds.

---

### Task 4: Add Detailed Client Install Guides

**Files:**
- Create: `site/source/install/index.md`
- Create: `site/source/install/claude-desktop.md`
- Create: `site/source/install/claude-code.md`
- Create: `site/source/install/cursor.md`
- Create: `site/source/install/vscode-copilot.md`
- Create: `site/source/install/windsurf.md`
- Create: `site/source/install/codex.md`
- Create: `site/source/install/gemini-cli.md`
- Create: `site/source/install/cline-roo.md`
- Create: `site/source/install/continue.md`
- Create: `site/source/install/zed.md`
- Create: `site/source/install/jetbrains.md`
- Create: `site/source/install/generic-mcp-json.md`

- [ ] **Step 1: Verify current client docs from primary sources**

Use web browsing for official docs only. Confirm config keys, file locations, and supported transports from:

- Claude Code MCP docs: `https://docs.claude.com/en/docs/claude-code/mcp`
- Cursor MCP docs: `https://docs.cursor.com/context/model-context-protocol`
- VS Code MCP docs: `https://code.visualstudio.com/docs/copilot/reference/mcp-configuration`
- Windsurf Cascade MCP docs: `https://docs.windsurf.com/windsurf/cascade/mcp`
- OpenAI Codex MCP docs: `https://platform.openai.com/docs/docs-mcp`
- Gemini CLI MCP docs: `https://github.com/google-gemini/gemini-cli/blob/main/docs/tools/mcp-server.md`
- Cline MCP docs: `https://docs.cline.bot/mcp/configuring-mcp-servers`
- Continue MCP docs: `https://docs.continue.dev/customize/mcp-tools`
- Zed MCP docs: `https://zed.dev/docs/ai/mcp`
- JetBrains AI Assistant MCP docs: `https://www.jetbrains.com/help/ai-assistant/configure-an-mcp-server.html`

Expected: each install page cites its source in a short "Platform notes" section without long copied quotes.

- [ ] **Step 2: Create `site/source/install/index.md`**

Include a table with columns: Client, Recommended transport, Config page, Verification path. Every client listed in the spec must appear once.

- [ ] **Step 3: Use the shared stdio config block where supported**

For local-command clients, include this snippet:

```json
{
  "mcpServers": {
    "netskope-npa": {
      "command": "npx",
      "args": ["-y", "@johnneerdael/ns-private-access-mcp"],
      "env": {
        "NETSKOPE_BASE_URL": "https://YOUR-TENANT.goskope.com",
        "NETSKOPE_API_TOKEN": "YOUR_NETSKOPE_API_TOKEN"
      }
    }
  }
}
```

- [ ] **Step 4: Use the shared HTTP config block where supported**

For Streamable HTTP clients, include this snippet:

```json
{
  "mcpServers": {
    "netskope-npa": {
      "url": "https://privateaccess.ntsk.app/mcp",
      "headers": {
        "X-Netskope-Tenant": "https://YOUR-TENANT.goskope.com",
        "Authorization": "Bearer YOUR_NETSKOPE_API_TOKEN"
      }
    }
  }
}
```

- [ ] **Step 5: Use the VS Code config shape on `vscode-copilot.md`**

If current VS Code docs still use top-level `servers`, include this shape:

```json
{
  "servers": {
    "netskope-npa": {
      "type": "http",
      "url": "https://privateaccess.ntsk.app/mcp",
      "headers": {
        "X-Netskope-Tenant": "https://YOUR-TENANT.goskope.com",
        "Authorization": "Bearer YOUR_NETSKOPE_API_TOKEN"
      }
    }
  }
}
```

If current docs differ, use the verified official shape and record the difference in the page.

- [ ] **Step 6: Use Codex TOML format on `codex.md`**

Include CLI and config examples:

```bash
codex mcp add netskope-npa --url https://privateaccess.ntsk.app/mcp
codex mcp list
```

```toml
[mcp_servers.netskope-npa]
url = "https://privateaccess.ntsk.app/mcp"

[mcp_servers.netskope-npa.headers]
X-Netskope-Tenant = "https://YOUR-TENANT.goskope.com"
Authorization = "Bearer YOUR_NETSKOPE_API_TOKEN"
```

Verify the exact TOML key name against official Codex docs during implementation.

- [ ] **Step 7: Include a consistent verification section on every client page**

Use this text:

```markdown
## Verify

Restart or refresh the client after saving MCP configuration. Then ask:

```text
List the Netskope NPA MCP tools you can access. Do not call any write tools.
```

If the client has an MCP status panel, confirm `netskope-npa` is connected before sending NPA prompts.
```

- [ ] **Step 8: Commit install guides**

Run:

```bash
git add site/source/install
git commit -m "Add MCP client install guides"
```

Expected: commit succeeds.

---

### Task 5: Build And Fix Static Site Issues

**Files:**
- Modify: `site/**` only for issues found by build/search

- [ ] **Step 1: Install site dependencies**

Run:

```bash
cd site
npm install
```

Expected: npm installs Hexo dependencies and creates or updates `site/package-lock.json`.

- [ ] **Step 2: Run Hexo clean build**

Run:

```bash
cd site
npm run clean
npm run build
```

Expected: `hexo clean` and `hexo generate` exit 0.

- [ ] **Step 3: Search for stale template references**

Run:

```bash
rg -n "terraform-netskope-publisher|/terraform-netskope-publisher|Provision Netskope Publishers|Terraform Registry" site --glob '!public/**' --glob '!node_modules/**'
```

Expected: no matches.

- [ ] **Step 4: Search generated output for stale template references**

Run:

```bash
rg -n "terraform-netskope-publisher|/terraform-netskope-publisher|Provision Netskope Publishers|Terraform Registry" site/public
```

Expected: no matches.

- [ ] **Step 5: Commit build lockfile and fixes**

Run:

```bash
git add site package-lock.json site/package-lock.json
git commit -m "Verify NPA MCP Hexo build"
```

Expected: commit succeeds if files changed. If only ignored build output changed and there is no lockfile change, record "No commit needed after build verification" in the implementation notes.

---

### Task 6: Browser Verification

**Files:**
- Modify: `site/**` only for visual or navigation defects found during verification

- [ ] **Step 1: Start the local Hexo server**

Run:

```bash
cd site
npm run serve -- --port 4000
```

Expected: Hexo serves the site at `http://localhost:4000/ns-private-access-mcp/`.

- [ ] **Step 2: Open the site in the in-app browser**

Use the Browser plugin to open:

```text
http://localhost:4000/ns-private-access-mcp/
```

Expected: the home page renders with the dark Cactus theme and Netskope logo.

- [ ] **Step 3: Verify primary pages**

Open these URLs:

```text
http://localhost:4000/ns-private-access-mcp/starter/
http://localhost:4000/ns-private-access-mcp/install/claude-code/
http://localhost:4000/ns-private-access-mcp/operations/docker/
http://localhost:4000/ns-private-access-mcp/reference/tool-categories/
```

Expected: each page renders, top navigation works, code blocks are readable, and no copied Terraform text appears.

- [ ] **Step 4: Check mobile width**

Use browser viewport or responsive mode around 390px width. Check:

```text
http://localhost:4000/ns-private-access-mcp/
http://localhost:4000/ns-private-access-mcp/install/
```

Expected: text and nav do not overlap; tables either fit acceptably in the theme or scroll horizontally.

- [ ] **Step 5: Stop the Hexo server**

Stop the running server process with Ctrl-C in its terminal session.

- [ ] **Step 6: Commit visual fixes**

Run:

```bash
git add site
git commit -m "Polish NPA MCP site navigation"
```

Expected: commit succeeds if visual fixes were needed. If no fixes were needed, do not create an empty commit.

---

### Task 7: Final Verification And Summary

**Files:**
- No planned file edits

- [ ] **Step 1: Run final build**

Run:

```bash
cd site
npm run clean
npm run build
```

Expected: exit 0.

- [ ] **Step 2: Check git status**

Run:

```bash
git status --short
```

Expected: only intentional untracked user files remain. `netskope-npa-publisher-audit-2026-05-12.md` may remain untracked.

- [ ] **Step 3: Summarize**

Report:

- Site location: `site/`
- Build command result
- Local URL used for browser verification
- Any client documentation details that were inferred from official docs
- Any remaining untracked files not touched

---

## Self-Review

Spec coverage:

- Template copy, images, colors, and Cactus theme are covered by Tasks 1 and 2.
- Home, starter, operations, and reference pages are covered by Task 3.
- All approved MCP client install guides are covered by Task 4.
- Build and stale-template verification are covered by Task 5.
- Browser and mobile checks are covered by Task 6.
- Final evidence before completion is covered by Task 7.

Placeholder scan:

- The plan contains credential placeholder values intentionally used in user-facing config snippets: `YOUR-TENANT` and `YOUR_NETSKOPE_API_TOKEN`.
- The plan contains no empty implementation placeholders.

Scope check:

- This is one cohesive documentation-site implementation. It does not need decomposition into separate specs.
