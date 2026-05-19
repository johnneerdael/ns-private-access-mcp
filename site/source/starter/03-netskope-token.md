---
title: Netskope Token
date: 2026-05-20
---

Create a Netskope REST API v2 token with only the permissions needed for the workflows you will allow. Store the token in your MCP client config or pass it as an HTTP header.

Environment variable form:

```bash
export NETSKOPE_BASE_URL="https://YOUR-TENANT.goskope.com"
export NETSKOPE_API_TOKEN="YOUR_NETSKOPE_API_TOKEN"
```

HTTP header form:

```http
X-Netskope-Tenant: https://YOUR-TENANT.goskope.com
Authorization: Bearer YOUR_NETSKOPE_API_TOKEN
```

Keep production tokens out of shared repository config. Use user-level MCP config or secret storage for personal credentials.
