---
title: Windsurf
date: 2026-05-20
---

## Recommendation

Use Streamable HTTP in Cascade for hosted or self-hosted NPA MCP.

## Config file

```text
~/.codeium/windsurf/mcp_config.json
```

You can also add servers from Windsurf Settings > Cascade > MCP Servers or the MCPs icon in the Cascade panel.

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

Refresh the MCP server in Cascade or restart Windsurf. Then ask:

```text
List the Netskope NPA MCP tools you can access. Do not call any write tools.
```

## Common issues

| Symptom | Fix |
|---------|-----|
| Config not loaded | Confirm the file path is `~/.codeium/windsurf/mcp_config.json`. |
| Remote server missing | Add it through Cascade MCP Servers and choose Streamable HTTP. |
| Header interpolation fails | Use literal values first, then move secrets into your preferred secret flow. |
| Enterprise settings block server | Check Teams or Enterprise MCP whitelist controls. |

## Platform notes

Windsurf Cascade documents stdio, Streamable HTTP, and SSE support, plus the `mcp_config.json` file.

Source: [Windsurf Cascade MCP docs](https://docs.windsurf.com/windsurf/cascade/mcp)
