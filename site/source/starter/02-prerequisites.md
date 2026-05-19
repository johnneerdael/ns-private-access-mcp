---
title: Prerequisites
date: 2026-05-20
---

You need:

- A Netskope tenant URL such as `https://YOUR-TENANT.goskope.com`
- A Netskope REST API v2 token with NPA permissions
- Node.js 22 or Docker for local/self-hosted modes
- An MCP-capable client

For stdio clients, install the npm package:

```bash
npm install -g @johnneerdael/ns-private-access-mcp
```

For local HTTP, run from a checkout of this repository:

```bash
docker compose up -d
```

Ready? -> [Create your Netskope token](/privateaccess-mcp/starter/03-netskope-token/)
