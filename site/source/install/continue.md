---
title: Continue
date: 2026-05-20
---

## Recommendation

Use Continue's `.continue/mcpServers/` folder for a dedicated MCP block. Continue can also load JSON MCP configs copied from tools such as Claude, Cursor, or Cline.

## YAML stdio

Create:

```text
.continue/mcpServers/netskope-npa.yaml
```

```yaml
name: Netskope NPA MCP
version: 0.0.1
schema: v1
mcpServers:
  - name: Netskope NPA
    type: stdio
    command: npx
    args:
      - "-y"
      - "@johnneerdael/ns-private-access-mcp"
    env:
      NETSKOPE_BASE_URL: "https://YOUR-TENANT.goskope.com"
      NETSKOPE_API_TOKEN: "YOUR_NETSKOPE_API_TOKEN"
```

## YAML Streamable HTTP

```yaml
name: Netskope NPA MCP
version: 0.0.1
schema: v1
mcpServers:
  - name: Netskope NPA
    type: streamable-http
    url: https://privateaccess.ntsk.app/mcp
    headers:
      X-Netskope-Tenant: "https://YOUR-TENANT.goskope.com"
      Authorization: "Bearer YOUR_NETSKOPE_API_TOKEN"
```

## JSON compatibility option

You can also place a JSON MCP config at:

```text
.continue/mcpServers/mcp.json
```

## Verify

Use Continue Agent mode. Then ask:

```text
List the Netskope NPA MCP tools you can access. Do not call any write tools.
```

## Common issues

| Symptom | Fix |
|---------|-----|
| Tools do not appear | Confirm you are in Agent mode. |
| YAML ignored | Include `name`, `version`, and `schema`. |
| JSON copied but not loaded | Place it under `.continue/mcpServers/`, plural. |
| Remote server fails | Confirm `type: streamable-http` and the `/mcp` URL. |

## Platform notes

Continue documents `.continue/mcpServers`, YAML MCP blocks, JSON compatibility, `stdio`, `sse`, and `streamable-http`.

Source: [Continue MCP setup](https://docs.continue.dev/customize/deep-dives/mcp)
