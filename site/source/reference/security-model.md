---
title: Security Model
date: 2026-05-20
---

Netskope NPA MCP does not replace Netskope authorization. It uses the tenant URL and API token provided by the client or server environment, then calls Netskope REST APIs with that token's permissions.

Operational expectations:

- Scope API tokens to the workflows agents need.
- Prefer read-only validation prompts for first use.
- Review write plans before allowing create, update, or delete operations.
- Use per-client headers for hosted multi-tenant endpoints.
- Avoid fallback credentials on shared deployments.

The MCP client controls when tools are exposed to an agent. Review the client's trust and approval settings before enabling write-capable tools.
