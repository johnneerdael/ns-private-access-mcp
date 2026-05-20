---
title: Tools
date: 2026-05-20
---

Netskope NPA MCP currently publishes 69 server-registered tools. This section documents the actual tool names exposed by `src/server.ts`, grouped by operational area.

| Category | Tools | Start here |
|----------|-------|------------|
| Publishers | 10 | [Publisher tools](/privateaccess-mcp/tools/publishers/) |
| Private apps | 20 | [Private app tools](/privateaccess-mcp/tools/private-apps/) |
| Local brokers | 8 | [Local broker tools](/privateaccess-mcp/tools/local-brokers/) |
| Policies | 10 | [Policy tools](/privateaccess-mcp/tools/policies/) |
| SCIM | 5 | [SCIM tools](/privateaccess-mcp/tools/scim/) |
| Upgrade profiles | 7 | [Upgrade profile tools](/privateaccess-mcp/tools/upgrade-profiles/) |
| Steering | 3 | [Steering tools](/privateaccess-mcp/tools/steering/) |
| Alerts | 2 | [Alert tools](/privateaccess-mcp/tools/alerts/) |
| Search | 2 | [Search tools](/privateaccess-mcp/tools/search/) |
| Validation | 2 | [Validation tools](/privateaccess-mcp/tools/validation/) |

## How to use this reference

Ask the model for intent first, not tool names:

```text
Use Netskope NPA MCP to assess publisher health. Start read-only, summarize what tools you will use, and do not change anything.
```

For changes, require a plan:

```text
Plan the NPA changes needed to onboard app.internal.example.com. Show the exact tools and parameters you would use. Do not execute writes until I approve.
```

Next: [Publisher tools](/privateaccess-mcp/tools/publishers/)
