---
title: Install Guides
date: 2026-05-20
---

Pick the guide for the MCP client you use. Prefer local stdio for clients that launch tools as subprocesses. Prefer Streamable HTTP for clients that support remote MCP endpoints.

| Client | Recommended transport | Guide | Verify |
|--------|-----------------------|-------|--------|
| Claude Desktop | stdio | [Claude Desktop](/ns-private-access-mcp/install/claude-desktop/) | Connectors menu |
| Claude Code | HTTP or stdio | [Claude Code](/ns-private-access-mcp/install/claude-code/) | `claude mcp list` and `/mcp` |
| Cursor | Streamable HTTP | [Cursor](/ns-private-access-mcp/install/cursor/) | Available Tools |
| VS Code / GitHub Copilot | Streamable HTTP | [VS Code / GitHub Copilot](/ns-private-access-mcp/install/vscode-copilot/) | MCP status and tool list |
| Windsurf | Streamable HTTP | [Windsurf](/ns-private-access-mcp/install/windsurf/) | Cascade MCPs panel |
| Codex | stdio | [Codex](/ns-private-access-mcp/install/codex/) | MCP/tools list in Codex |
| Gemini CLI | Streamable HTTP | [Gemini CLI](/ns-private-access-mcp/install/gemini-cli/) | CLI startup discovery |
| Cline / Roo Code | Streamable HTTP | [Cline / Roo Code](/ns-private-access-mcp/install/cline-roo/) | MCP Servers panel |
| Continue | stdio or Streamable HTTP | [Continue](/ns-private-access-mcp/install/continue/) | Agent mode tools |
| Zed | Streamable HTTP | [Zed](/ns-private-access-mcp/install/zed/) | Agent Panel indicator |
| JetBrains AI Assistant / Junie | Streamable HTTP | [JetBrains](/ns-private-access-mcp/install/jetbrains/) | MCP status column |
| Generic MCP JSON | stdio or Streamable HTTP | [Generic MCP JSON](/ns-private-access-mcp/install/generic-mcp-json/) | Client-specific tool list |

Use these placeholder values consistently:

- `https://YOUR-TENANT.goskope.com`
- `YOUR_NETSKOPE_API_TOKEN`
- `https://privateaccess.ntsk.app/mcp`
- `http://localhost:3000/mcp`
