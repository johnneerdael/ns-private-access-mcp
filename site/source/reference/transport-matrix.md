---
title: Transport Matrix
date: 2026-05-20
---

| Transport | Local command | Remote endpoint | Credentials |
|-----------|---------------|-----------------|-------------|
| stdio | `npx -y @johnneerdael/ns-private-access-mcp` | No | Environment variables |
| local HTTP | `node dist/cli-http.js` or Docker | `http://localhost:3000/mcp` | Headers or fallback env |
| hosted HTTP | No local command | `https://privateaccess.ntsk.app/mcp` | Per-client headers |

Choose stdio for local subprocess clients. Choose HTTP when the platform supports remote MCP servers or when you want one controlled endpoint.
