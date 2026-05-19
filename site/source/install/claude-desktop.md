---
title: Claude Desktop
date: 2026-05-20
---

## Recommendation

Use local stdio. Claude Desktop's direct local MCP setup uses `claude_desktop_config.json` with an `mcpServers` object. For team distribution, Claude Desktop also supports desktop extensions, but this guide shows the direct developer configuration.

## Config file

macOS:

```text
~/Library/Application Support/Claude/claude_desktop_config.json
```

Windows:

```text
%APPDATA%\Claude\claude_desktop_config.json
```

Create the file if it does not exist.

## Configuration

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

On Windows, use `npx.cmd` if `npx` is not resolved by the Desktop app.

## Refresh

Fully quit Claude Desktop and start it again. Closing the window is not always enough.

## Verify

Open the plus menu in the chat box and check Connectors. The `netskope-npa` server should appear with tools.

Ask:

```text
List the Netskope NPA MCP tools you can access. Do not call any write tools.
```

## Common issues

| Symptom | Fix |
|---------|-----|
| Server is missing | Check JSON syntax and restart Claude Desktop completely. |
| `npx` not found | Use the full path to `npx` or `npx.cmd`. |
| Auth fails | Confirm `NETSKOPE_BASE_URL` and `NETSKOPE_API_TOKEN`. |
| Tools appear but calls fail | Check Claude Desktop MCP logs and server stderr output. |

## Platform notes

Claude Desktop local MCP setup is documented by the official MCP quickstart, which uses `claude_desktop_config.json` and `mcpServers`. Anthropic's current Claude Desktop help also describes desktop extensions for packaged local MCP servers.

Sources: [MCP quickstart](https://modelcontextprotocol.io/docs/develop/build-server), [Claude Desktop local MCP help](https://support.anthropic.com/en/articles/10949351-getting-started-with-local-mcp-servers-on-claude-desktop)
