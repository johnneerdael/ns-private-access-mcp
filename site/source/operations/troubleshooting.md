---
title: Operations Troubleshooting
date: 2026-05-20
---

## Health

```bash
curl http://localhost:3000/healthz
```

If health fails, confirm the process is running and bound to the expected `HOST` and `PORT`.

## MCP connection

Confirm the client endpoint ends with `/mcp`. For local Docker:

```text
http://localhost:3000/mcp
```

## Authentication

Authentication failures usually mean one of these values is missing or malformed:

- `X-Netskope-Tenant`
- `Authorization: Bearer YOUR_NETSKOPE_API_TOKEN`
- `NETSKOPE_BASE_URL`
- `NETSKOPE_API_TOKEN`

## CORS

Browser-based clients may require `CORS_ORIGIN` to include the client origin. CLI and desktop clients generally do not need CORS.
