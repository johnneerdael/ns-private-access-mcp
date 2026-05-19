---
title: Choose A Transport
date: 2026-05-20
---

| Transport | Endpoint shape | Best for |
|-----------|----------------|----------|
| stdio | Client launches `netskope-mcp` locally | Claude Desktop, Claude Code, local-first IDEs |
| Streamable HTTP | Client connects to `/mcp` | Cursor, Windsurf, VS Code, hosted/self-hosted deployments |
| Docker HTTP | Container exposes `/mcp` and `/healthz` | Teams running a controlled internal endpoint |

Prefer stdio when the client expects local subprocess MCP servers. Prefer HTTP when the client supports remote MCP endpoints and you want one shared deployment.

Ready? -> [Configure your first client](/privateaccess-mcp/starter/05-configure-first-client/)
