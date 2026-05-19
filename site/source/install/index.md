---
title: Install Guides
date: 2026-05-20
---

Pick the guide for the MCP client you use. Prefer local stdio for clients that launch tools as subprocesses. Prefer Streamable HTTP for clients that support remote MCP endpoints.

| Client | Recommended transport | Guide | Verify |
|--------|-----------------------|-------|--------|
| Claude Desktop | stdio | [Claude Desktop](/privateaccess-mcp/install/claude-desktop/) | Connectors menu |
| Claude Code | HTTP or stdio | [Claude Code](/privateaccess-mcp/install/claude-code/) | `claude mcp list` and `/mcp` |
| Cursor | Streamable HTTP | [Cursor](/privateaccess-mcp/install/cursor/) | Available Tools |
| VS Code / GitHub Copilot | Streamable HTTP | [VS Code / GitHub Copilot](/privateaccess-mcp/install/vscode-copilot/) | MCP status and tool list |
| Windsurf | Streamable HTTP | [Windsurf](/privateaccess-mcp/install/windsurf/) | Cascade MCPs panel |
| Codex | stdio | [Codex](/privateaccess-mcp/install/codex/) | MCP/tools list in Codex |
| Gemini CLI | Streamable HTTP | [Gemini CLI](/privateaccess-mcp/install/gemini-cli/) | CLI startup discovery |
| Cline / Roo Code | Streamable HTTP | [Cline / Roo Code](/privateaccess-mcp/install/cline-roo/) | MCP Servers panel |
| Continue | stdio or Streamable HTTP | [Continue](/privateaccess-mcp/install/continue/) | Agent mode tools |
| Zed | Streamable HTTP | [Zed](/privateaccess-mcp/install/zed/) | Agent Panel indicator |
| JetBrains AI Assistant / Junie | Streamable HTTP | [JetBrains](/privateaccess-mcp/install/jetbrains/) | MCP status column |
| Generic MCP JSON | stdio or Streamable HTTP | [Generic MCP JSON](/privateaccess-mcp/install/generic-mcp-json/) | Client-specific tool list |

Use these placeholder values consistently:

- `https://YOUR-TENANT.goskope.com`
- `YOUR_NETSKOPE_API_TOKEN`
- `https://privateaccess.ntsk.app/mcp`
- `http://localhost:3000/mcp`
