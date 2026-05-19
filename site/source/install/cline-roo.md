---
title: Cline / Roo Code
date: 2026-05-20
---

## Recommendation

Use Streamable HTTP for hosted NPA MCP. Use stdio for local-only setups. Cline and Roo Code both use JSON with `mcpServers`, but Roo Code requires an explicit `type` for URL-based Streamable HTTP configs.

## Cline hosted HTTP

```json
{
  "mcpServers": {
    "netskope-npa": {
      "url": "https://privateaccess.ntsk.app/mcp",
      "headers": {
        "X-Netskope-Tenant": "https://YOUR-TENANT.goskope.com",
        "Authorization": "Bearer YOUR_NETSKOPE_API_TOKEN"
      },
      "disabled": false,
      "autoApprove": []
    }
  }
}
```

## Roo Code hosted HTTP

```json
{
  "mcpServers": {
    "netskope-npa": {
      "type": "streamable-http",
      "url": "https://privateaccess.ntsk.app/mcp",
      "headers": {
        "X-Netskope-Tenant": "https://YOUR-TENANT.goskope.com",
        "Authorization": "Bearer YOUR_NETSKOPE_API_TOKEN"
      },
      "disabled": false,
      "alwaysAllow": []
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
      },
      "disabled": false
    }
  }
}
```

## Verify

Open the MCP Servers panel, confirm `netskope-npa` is connected, then ask:

```text
List the Netskope NPA MCP tools you can access. Do not call any write tools.
```

## Common issues

| Symptom | Fix |
|---------|-----|
| Cline CLI config unknown | Run `cline mcp` and use the wizard. |
| Roo URL config fails | Add `type: "streamable-http"` for Roo Code. |
| Tools over-approved | Leave `autoApprove` or `alwaysAllow` empty for first use. |
| Server times out | Increase per-server timeout after confirming health. |

## Platform notes

Cline supports manual config under `mcpServers`, local stdio, and remote HTTP/SSE servers. Roo Code supports global `mcp_settings.json`, project `.roo/mcp.json`, stdio, Streamable HTTP, and SSE.

Sources: [Cline MCP docs](https://docs.cline.bot/mcp/configuring-mcp-servers), [Roo Code MCP docs](https://docs.roocode.com/features/mcp/using-mcp-in-roo)
