---
title: Codex
date: 2026-05-20
---

## Recommendation

Use local stdio for the most predictable Codex setup. Configure Codex in `~/.codex/config.toml`.

## Local stdio

```toml
[mcp_servers.netskope-npa]
command = "npx"
args = ["-y", "@johnneerdael/ns-private-access-mcp"]

[mcp_servers.netskope-npa.env]
NETSKOPE_BASE_URL = "https://YOUR-TENANT.goskope.com"
NETSKOPE_API_TOKEN = "YOUR_NETSKOPE_API_TOKEN"
```

## Hosted HTTP

Use this only if your Codex version supports HTTP MCP servers in config:

```toml
[mcp_servers.netskope-npa]
url = "https://YOUR-MCP-HOST.example.com/mcp"

[mcp_servers.netskope-npa.http_headers]
X-Netskope-Tenant = "https://YOUR-TENANT.goskope.com"
Authorization = "Bearer YOUR_NETSKOPE_API_TOKEN"
```

If HTTP servers do not appear in your Codex tool list, use the stdio configuration above.

## Verify

Restart Codex after editing `config.toml`. Then check the MCP/tool list in the CLI or app and ask:

```text
List the Netskope NPA MCP tools you can access. Do not call any write tools.
```

## Common issues

| Symptom | Fix |
|---------|-----|
| Server not detected | Restart Codex and verify TOML syntax. |
| HTTP server not loaded | Use stdio; HTTP support has varied across Codex builds. |
| Token leaked into project config | Keep MCP config in user-level `~/.codex/config.toml`. |
| `npx` fails | Use an absolute path or install the package globally. |

## Platform notes

Codex configuration is TOML-based under `~/.codex/config.toml`; the OpenAI Codex repository documents `[mcp_servers]` examples for stdio. Current OpenAI public docs focus on the OpenAI docs MCP server rather than every custom server shape, so prefer stdio when in doubt.

Sources: [OpenAI Codex config reference](https://github.com/openai/codex/blob/main/codex-rs/config.md), [OpenAI Docs MCP](https://platform.openai.com/docs/docs-mcp)
