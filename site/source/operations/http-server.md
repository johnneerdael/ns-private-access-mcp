---
title: HTTP Server
date: 2026-05-20
---

The HTTP server exposes:

| Path | Purpose |
|------|---------|
| `/mcp` | Streamable HTTP MCP endpoint |
| `/healthz` | Liveness and deployment metadata |

Run locally:

```bash
npm run build
PORT=3000 node dist/cli-http.js
```

Health check:

```bash
curl http://localhost:3000/healthz
```

When deploying behind a reverse proxy, forward the `/mcp` path unchanged and preserve authorization headers.
