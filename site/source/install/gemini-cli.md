---
title: Gemini CLI
date: 2026-05-20
---

## Recommendation

Use `httpUrl` for Streamable HTTP. Gemini CLI uses `mcpServers` in `settings.json`.

## Hosted HTTP

```json
{
  "mcpServers": {
    "netskope-npa": {
      "httpUrl": "https://YOUR-MCP-HOST.example.com/mcp",
      "headers": {
        "X-Netskope-Tenant": "https://YOUR-TENANT.goskope.com",
        "Authorization": "Bearer YOUR_NETSKOPE_API_TOKEN"
      },
      "timeout": 30000,
      "trust": false
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
        "NETSKOPE_BASE_URL": "$NETSKOPE_BASE_URL",
        "NETSKOPE_API_TOKEN": "$NETSKOPE_API_TOKEN"
      },
      "timeout": 30000,
      "trust": false
    }
  }
}
```

## Verify

Restart Gemini CLI so it runs MCP discovery. Then ask:

```text
List the Netskope NPA MCP tools you can access. Do not call any write tools.
```

## Common issues

| Symptom | Fix |
|---------|-----|
| HTTP config ignored | Use `httpUrl`, not `url`, for Streamable HTTP. |
| SSE chosen accidentally | `url` is for SSE endpoints; NPA MCP uses `/mcp`. |
| Tools names look prefixed | Gemini namespaces MCP tools using the server name. |
| Too many approvals | Keep `trust: false` for first use, then allowlist intentionally. |

## Platform notes

Gemini CLI documents `mcpServers`, `httpUrl` for HTTP streaming, `url` for SSE, custom `headers`, and environment variable references.

Source: [Gemini CLI MCP server docs](https://github.com/google-gemini/gemini-cli/blob/main/docs/tools/mcp-server.md)
