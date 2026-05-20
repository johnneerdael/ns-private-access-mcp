---
title: Self-hosted HTTP Endpoint
date: 2026-05-20
---

The self-hosted HTTP endpoint is useful when a client supports remote MCP over HTTP and you do not want the client to launch a local process.

```text
https://YOUR-MCP-HOST.example.com/mcp
```

Pass tenant credentials as request headers:

```json
{
  "headers": {
    "X-Netskope-Tenant": "https://YOUR-TENANT.goskope.com",
    "Authorization": "Bearer YOUR_NETSKOPE_API_TOKEN"
  }
}
```

Use a token scoped to the actions you want agents to perform. For shared endpoints, do not configure fallback tenant credentials on the server; require per-client headers.
