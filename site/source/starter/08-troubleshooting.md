---
title: Troubleshooting
date: 2026-05-20
---

Common startup failures:

| Symptom | Check |
|---------|-------|
| Client shows no tools | Restart the client after editing MCP config. |
| Command not found | Use `npx -y @johnneerdael/ns-private-access-mcp` or install globally. |
| Authentication fails | Confirm tenant URL, token value, and header names. |
| HTTP connection fails | Confirm the endpoint ends in `/mcp` and the server is reachable. |
| Browser client CORS error | Set `CORS_ORIGIN` to the browser client's origin on self-hosted HTTP. |

For local HTTP health:

```bash
curl http://localhost:3000/healthz
```
