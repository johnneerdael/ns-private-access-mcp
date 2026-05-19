# NPA MCP GitHub Pages Site Design

Date: 2026-05-20

## Goal

Build a Hexo-based GitHub Pages documentation site for the Netskope NPA MCP server by copying the working site template from `../terraform-netskope-publisher/site`. The new site must keep the existing Netskope visual identity, images, colors, Cactus theme, and compact technical documentation style while replacing the content with detailed NPA MCP user guidance.

## Scope

Create a `site/` directory in this repository. The site will be generated with Hexo and published from the generated static output through GitHub Pages.

The site must cover:

- What the NPA MCP server does.
- Hosted versus self-hosted usage.
- Prerequisites for Netskope tenants and API tokens.
- Installation instructions for major MCP-capable coding platforms.
- First-use verification prompts and troubleshooting.
- Operational guidance for Docker, Node, HTTP transport, environment variables, and secret handling.
- Reference material for tool categories, transports, configuration snippets, and security expectations.

The first-class client install guides are:

- Claude Desktop
- Claude Code
- Cursor
- VS Code / GitHub Copilot
- Windsurf
- Codex
- Gemini CLI
- Cline / Roo Code
- Continue
- Zed
- JetBrains AI Assistant / Junie
- Generic MCP JSON / Streamable HTTP clients

## Non-Goals

- Do not redesign the visual system from scratch.
- Do not replace Hexo/Cactus with another framework.
- Do not change the MCP server implementation.
- Do not publish a release or bump npm/package versions.
- Do not modify unrelated existing documentation except where links need to point to the new site.

## Visual Design

Use the `terraform-netskope-publisher` site as the source of truth:

- Copy the Hexo project structure, theme configuration, Cactus dependency setup, logo, favicon, and dark Netskope color scheme.
- Update metadata, navigation, URLs, titles, and descriptions for `ns-private-access-mcp`.
- Preserve the compact operator-docs feel: short top pages, deep task pages, direct links, code examples, and minimal decoration.
- Use actual Netskope logo/favicon assets from the template site. Do not introduce generated illustrations or unrelated stock imagery.

The home page should act as a product and docs entry point, not a marketing landing page. It should quickly answer:

- What is this?
- Which transport should I use?
- How do I install it in my coding platform?
- How do I verify it works?

## Information Architecture

### Home

`/`

Purpose: Orient new users and route them to the correct path.

Content:

- One-paragraph product summary.
- Quick links to starter guide, install guides, operations, and reference.
- Hosted endpoint versus local/self-hosted decision table.
- Minimal command examples for npm and Docker.

### Starter Guide

`/starter/`

Linear walkthrough for a first successful connection:

1. What you will connect
2. Prerequisites
3. Netskope tenant and API token setup
4. Choose hosted or local transport
5. Configure your first MCP client
6. Verify available tools
7. Run first safe read-only prompts
8. Troubleshoot startup and authentication
9. Next steps

### Install Guides

`/install/`

Client-specific pages with detailed configuration examples. Each page should include:

- Supported transport mode for this project: stdio, Streamable HTTP, or both.
- Best default recommendation for that client.
- Exact config snippet using placeholders.
- Where to put the config.
- How to refresh/restart the client.
- How to verify tools are available.
- Common failure modes for that client.

Use official current client documentation as source material for client-specific configuration details when implementing these pages.

### Operations

`/operations/`

Production and self-hosting material:

- Hosted endpoint usage
- Docker Compose usage
- Local Node usage
- HTTP server deployment
- Required and optional environment variables
- CORS behavior
- Secret handling
- Reverse proxy guidance
- Health checks
- Logs and troubleshooting

### Reference

`/reference/`

Reference pages:

- Tool category matrix
- Transport matrix
- Configuration snippet library
- Security model and permissions
- API token permission checklist
- Changelog/status page summarizing the current npm package and site documentation state
- Roadmap page describing planned documentation and MCP server improvements

## Configuration Examples

Examples should use consistent placeholders:

- `https://YOUR-TENANT.goskope.com`
- `YOUR_NETSKOPE_API_TOKEN`
- `https://privateaccess.ntsk.app/mcp` for hosted HTTP examples when referring to the hosted deployment
- `http://localhost:3000/mcp` for local HTTP examples
- `@johnneerdael/ns-private-access-mcp` for npm-based stdio examples

Include both hosted HTTP and local stdio patterns where the platform supports them. Prefer hosted HTTP for clients that handle Streamable HTTP well. Prefer stdio/npm for clients that are primarily local-process oriented.

## Implementation Notes

- Copy from `../terraform-netskope-publisher/site` into `site/`.
- Do not copy generated `public/` output unless the template requires it for local verification. Generated output should generally remain build output.
- Keep or adapt `site/source/_data/page-order.yml` for ordered previous/next navigation.
- Update `_config.yml` with this repository's GitHub Pages URL and root path.
- Update `_config.cactus.yml` navigation to `home`, `starter`, `install`, `operations`, `reference`, and GitHub.
- Keep copied image assets under `site/source/images/`.
- Add or update `.gitignore` only if needed to ignore Hexo generated output and dependency directories.

## Verification Plan

Implementation is complete only after fresh verification:

- Run `npm install` or equivalent inside `site/` if dependencies are not already installed.
- Run `npm run build` inside `site/`.
- Inspect generated output for broken obvious template references to `terraform-netskope-publisher`.
- Start the Hexo server with `npm run serve` or equivalent.
- Use the browser to open the local site and verify:
  - Home page renders.
  - Logo/favicon load.
  - Dark Netskope styling is preserved.
  - Primary navigation works.
  - At least one starter page, one install guide, one operations page, and one reference page render.
  - Text does not visibly overlap on desktop or mobile width.

## Risks

- MCP client configuration formats change frequently. Mitigate by checking official docs during implementation and avoiding unsupported claims.
- Claude Desktop and some clients may differ in remote HTTP support. Mitigate by documenting known-good stdio or bridge patterns separately from HTTP examples.
- The template site may include project-specific URLs in page order, nav, or body content. Mitigate with a repository-wide search for the old project name and root path before final verification.

## Approval Status

Design approved by the user on 2026-05-20.
