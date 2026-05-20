---
title: VS Code / GitHub Copilot
date: 2026-05-20
---

## Recommendation

Use Streamable HTTP with VS Code's MCP configuration. VS Code uses a top-level `servers` object, not `mcpServers`.

## Config locations

Use the Command Palette:

```text
MCP: Open User Configuration
MCP: Open Workspace Folder MCP Configuration
```

Workspace config is usually:

```text
.vscode/mcp.json
```

## Hosted HTTP

```json
{
  "servers": {
    "netskope-npa": {
      "type": "http",
      "url": "https://YOUR-MCP-HOST.example.com/mcp",
      "headers": {
        "X-Netskope-Tenant": "https://YOUR-TENANT.goskope.com",
        "Authorization": "Bearer YOUR_NETSKOPE_API_TOKEN"
      }
    }
  }
}
```

## Local stdio

```json
{
  "servers": {
    "netskope-npa": {
      "type": "stdio",
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

## Verify

Use the MCP status UI or command palette to confirm the server is running. If tools changed, run:

```text
MCP: Reset Cached Tools
```

Then ask:

```text
List the Netskope NPA MCP tools you can access. Do not call any write tools.
```

## Common issues

| Symptom | Fix |
|---------|-----|
| Config rejected | Confirm the file uses top-level `servers`. |
| Old tools remain | Run `MCP: Reset Cached Tools`. |
| Workspace server not trusted | Reset or confirm MCP trust decisions. |
| HTTP fails | Confirm `type` is `http` and URL ends in `/mcp`. |

## Platform notes

VS Code MCP configuration supports `http`, `sse`, and local server types and exposes commands for user and workspace MCP configuration.

Source: [VS Code MCP configuration reference](https://code.visualstudio.com/docs/copilot/reference/mcp-configuration)
