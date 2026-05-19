---
title: JetBrains AI Assistant / Junie
date: 2026-05-20
---

## Recommendation

Use Streamable HTTP through Settings > Tools > AI Assistant > Model Context Protocol (MCP). Use project level for repo-specific setup or global level for your personal workstation.

## Hosted HTTP

Paste this JSON configuration when adding a new MCP server:

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

## Apply

1. Open Settings.
2. Go to Tools > AI Assistant > Model Context Protocol (MCP).
3. Add a server.
4. Paste the JSON configuration.
5. Choose global or project level.
6. Click Apply.

## Verify

Check the MCP status column. Review available tools from the status icon, then ask:

```text
List the Netskope NPA MCP tools you can access. Do not call any write tools.
```

## Common issues

| Symptom | Fix |
|---------|-----|
| Server not started | Select the server and click reconnect. |
| Tools not visible | Review available tools from the status column. |
| Logs needed | Open IDE logs and inspect the `mcp` folder. |
| Project/global mismatch | Change the server level in the MCP table. |

## Platform notes

JetBrains AI Assistant supports STDIO, Streamable HTTP, and legacy SSE MCP transports. Its settings UI accepts JSON under `mcpServers`.

Source: [JetBrains MCP docs](https://www.jetbrains.com/help/ai-assistant/configure-an-mcp-server.html)
