---
title: Generic MCP JSON
date: 2026-05-20
---

## Use this when

Use this guide for clients that accept a standard `mcpServers` JSON object but do not have a dedicated page here.

## Hosted HTTP

```json
{
  "mcpServers": {
    "netskope-npa": {
      "url": "https://YOUR-MCP-HOST.example.com/mcp",
      "headers": {
        "X-Netskope-Tenant": "https://YOUR-TENANT.goskope.com",
        "Authorization": "Bearer YOUR_NETSKOPE_API_TOKEN"
      }
    }
  }
}
```

## Local HTTP

Run the server:

```bash
docker run --rm -p 3000:3000 ghcr.io/johnneerdael/privateaccess-mcp:latest
```

Configure the client:

```json
{
  "mcpServers": {
    "netskope-npa": {
      "url": "http://localhost:3000/mcp",
      "headers": {
        "X-Netskope-Tenant": "https://YOUR-TENANT.goskope.com",
        "Authorization": "Bearer YOUR_NETSKOPE_API_TOKEN"
      }
    }
  }
}
```

## Local stdio

```json
{
  "mcpServers": {
    "netskope-npa": {
      "command": "npx",
      "args": ["-y", "@johnneerdael/ns-private-access-mcp"],
      "env": {
        "NETSKOPE_BASE_URL": "https://YOUR-TENANT.goskope.com",
        "NETSKOPE_API_TOKEN": "YOUR_NETSKOPE_API_TOKEN"
      }
    }
  }
}
```

## Verify

Restart or refresh the client after saving MCP configuration. Then ask:

```text
List the Netskope NPA MCP tools you can access. Do not call any write tools.
```

## Common issues

| Symptom | Fix |
|---------|-----|
| Client expects `servers` instead | Use the VS Code guide. |
| Client expects TOML | Use the Codex guide. |
| Client expects YAML | Use the Continue guide. |
| URL config fails | Confirm the client supports Streamable HTTP, not only SSE. |
