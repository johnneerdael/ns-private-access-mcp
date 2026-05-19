---
title: Local Node
date: 2026-05-20
---

Use local Node when developing the server or when a client launches stdio MCP servers.

Install dependencies and build:

```bash
npm install
npm run build
```

Run stdio mode:

```bash
npm start
```

Run HTTP mode:

```bash
PORT=3000 node dist/cli-http.js
```

For global stdio installation:

```bash
npm install -g @johnneerdael/ns-private-access-mcp
```
