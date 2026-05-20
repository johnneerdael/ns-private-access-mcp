---
title: Environment Variables
date: 2026-05-20
---

| Variable | Purpose |
|----------|---------|
| `PORT` / `HOST` | HTTP bind address, defaulting to `0.0.0.0:3000`. |
| `PUBLIC_URL` | Canonical public origin shown in `/healthz` and startup output. |
| `CORS_ORIGIN` | Comma-separated browser origin allowlist. |
| `NETSKOPE_BASE_URL` | Optional fallback tenant URL for single-tenant deployments. |
| `NETSKOPE_API_TOKEN` | Optional fallback token for single-tenant deployments. |

For multi-tenant self-hosted deployments, leave fallback Netskope credentials unset and require clients to send headers.

For single-tenant local deployments:

```bash
export NETSKOPE_BASE_URL="https://YOUR-TENANT.goskope.com"
export NETSKOPE_API_TOKEN="YOUR_NETSKOPE_API_TOKEN"
```
