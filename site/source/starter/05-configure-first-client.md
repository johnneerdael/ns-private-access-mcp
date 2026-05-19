---
title: Configure Your First Client
date: 2026-05-20
---

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
