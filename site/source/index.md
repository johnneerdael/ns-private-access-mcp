---
title: Netskope NPA MCP
date: 2026-05-20
---

Netskope NPA MCP is a Model Context Protocol server for managing Netskope Private Access infrastructure from MCP-capable AI clients. It exposes 69 tools for publishers, private apps, local brokers, policies, SCIM identity data, upgrade profiles, steering, alerts, search, and validation.

## Choose your path

| Path | Use when | Start here |
|------|----------|------------|
| Hosted HTTP | You want the quickest client setup and can send tenant URL plus API token as MCP request headers. | [Install guides](/privateaccess-mcp/install/) |
| Local stdio | Your client launches MCP servers as local commands. | [Starter guide](/privateaccess-mcp/starter/) |
| Self-hosted HTTP | You want a private endpoint behind your own network controls. | [Operations](/privateaccess-mcp/operations/) |

## Quick install

Local stdio:

```bash
npm install -g @johnneerdael/ns-private-access-mcp
```

Local HTTP:

```bash
docker run --rm -p 3000:3000 ghcr.io/johnneerdael/privateaccess-mcp:latest
```

## Documentation

- New users: [Starter guide](/privateaccess-mcp/starter/)
- Client setup: [Install guides](/privateaccess-mcp/install/)
- Published tool surface: [Tools](/privateaccess-mcp/tools/)
- Real operating patterns: [Workflows](/privateaccess-mcp/workflows/)
- Prompt examples: [Examples](/privateaccess-mcp/examples/)
- Hosting and operations: [Operations](/privateaccess-mcp/operations/)
- Tool and security details: [Reference](/privateaccess-mcp/reference/)
