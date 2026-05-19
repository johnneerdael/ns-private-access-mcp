---
title: Zed
date: 2026-05-20
---

## Recommendation

Use a custom server from the Agent Panel settings. Streamable HTTP is the best fit for the hosted endpoint.

## Add custom server

Open the Agent Panel settings view, then choose Add Custom Server. Use the server provider's JSON shape when prompted.

## Hosted HTTP

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

## Verify

Open the Agent Panel settings view and check the indicator next to `netskope-npa`. A healthy server shows an active status.

Then ask:

```text
List the Netskope NPA MCP tools you can access. Do not call any write tools.
```

## Common issues

| Symptom | Fix |
|---------|-----|
| OAuth prompt appears | Confirm the `Authorization` header is configured. |
| Indicator is not green | Open the tooltip/status and inspect the server error. |
| Tools not selected | Mention the `netskope-npa` server by name in the prompt. |
| Local command fails | Use a full path to `npx` or install globally. |

## Platform notes

Zed documents custom MCP servers through the Agent Panel and notes that remote servers without an `Authorization` header may trigger OAuth.

Source: [Zed MCP docs](https://zed.dev/docs/ai/mcp)
