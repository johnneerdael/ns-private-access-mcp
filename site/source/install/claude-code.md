---
title: Claude Code
date: 2026-05-20
---

## Recommendation

Use HTTP when you want the self-hosted HTTP endpoint. Use stdio when you want Claude Code to launch the npm package locally.

## Add self-hosted HTTP

```bash
claude mcp add-json netskope-npa '{"type":"http","url":"https://YOUR-MCP-HOST.example.com/mcp","headers":{"X-Netskope-Tenant":"https://YOUR-TENANT.goskope.com","Authorization":"Bearer YOUR_NETSKOPE_API_TOKEN"}}' --scope user
```

Use `--scope local` for the current project only or `--scope project` to create a shared `.mcp.json`.

## Add local stdio

```bash
claude mcp add-json netskope-npa '{"type":"stdio","command":"npx","args":["-y","@johnneerdael/ns-private-access-mcp"],"env":{"NETSKOPE_BASE_URL":"https://YOUR-TENANT.goskope.com","NETSKOPE_API_TOKEN":"YOUR_NETSKOPE_API_TOKEN"}}' --scope user
```

## Manage

```bash
claude mcp list
claude mcp get netskope-npa
```

Inside Claude Code, run:

```text
/mcp
```

## Verify

Restart Claude Code after config changes. Then ask:

```text
List the Netskope NPA MCP tools you can access. Do not call any write tools.
```

## Common issues

| Symptom | Fix |
|---------|-----|
| Server not listed | Re-run `claude mcp list` and confirm the selected scope. |
| JSON shell escaping fails | Put the JSON in a temporary file and use the documented JSON import flow. |
| Headers not sent | Use `type: "http"` and include the headers object in the JSON. |
| Tools hidden in current project | Check local, project, and user scopes. |

## Platform notes

Claude Code supports `claude mcp add-json`, stdio and HTTP server types, scopes, `claude mcp list`, and `/mcp` status checks.

Source: [Claude Code MCP docs](https://docs.claude.com/en/docs/claude-code/mcp)
