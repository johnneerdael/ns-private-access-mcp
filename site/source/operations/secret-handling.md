---
title: Secret Handling
date: 2026-05-20
---

Treat Netskope API tokens as production credentials.

- Prefer user-level MCP config over repository config.
- Do not commit tenant URLs and tokens together in shared files.
- Use per-client HTTP headers for shared self-hosted HTTP endpoints.
- Use fallback environment variables only for single-tenant deployments.
- Rotate tokens after demos, tests, or incident response workflows.

For write-capable workflows, use a token scoped to the specific NPA operations agents are allowed to perform.
