---
title: Cursor
date: 2026-05-20
---

## Recommendation

Use Streamable HTTP for the self-hosted HTTP endpoint. Use stdio only when you want Cursor to launch the npm package locally.

## Config files

Project:

```text
.cursor/mcp.json
```

Global:

```text
~/.cursor/mcp.json
```

## Hosted HTTP

```json
{
  "mcpServers": {
    "netskope-npa": {
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

## Verify

Restart or refresh Cursor after saving MCP configuration. Then ask:

```text
List the Netskope NPA MCP tools you can access. Do not call any write tools.
```

If the client has an MCP status panel, confirm `netskope-npa` is connected before sending NPA prompts.

## Common issues

| Symptom | Fix |
|---------|-----|
| Tools unavailable | Check Cursor settings and the Available Tools list. |
| Project config ignored | Confirm the file is exactly `.cursor/mcp.json`. |
| Remote auth fails | Confirm headers and token value. |
| Local command fails | Use `npx -y` or a full path to Node/npm. |

## Platform notes

Cursor documents stdio, SSE, and Streamable HTTP transports and uses `mcpServers` in project or global `mcp.json`.

Source: [Cursor MCP docs](https://docs.cursor.com/context/model-context-protocol)
