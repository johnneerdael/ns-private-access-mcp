# Netskope NPA MCP Server

A comprehensive Model Context Protocol (MCP) server for managing Netskope Private Access (NPA) infrastructure through AI-powered automation.

## 📚 Complete Documentation

This project includes extensive documentation organized for easy navigation:

**👉 [Start with the Complete Documentation](./docs/README.md)** - Overview and navigation guide

### Quick Access Links

| Category | Description | Link |
|----------|-------------|------|
| **🏗️ Architecture** | Server design and patterns | [Server Architecture](./docs/architecture/server-architecture.md) |
| **🛠️ Tools Reference** | Complete tool documentation | [Publisher Tools](./docs/tools/publisher-tools.md), [Private App Tools](./docs/tools/private-app-tools.md), [Policy Tools](./docs/tools/policy-tools.md) |
| **🔄 Workflows** | Common automation patterns | [Common Workflows](./docs/workflows/common-workflows.md) |
| **💼 Real Examples** | Complete use cases | [Real-World Examples](./docs/examples/real-world-examples.md) |

## Tool Overview

The MCP server provides **84 specialized tools** across 10 categories:

| Category | Tools | Primary Use Cases |
|----------|-------|------------------|
| **Publishers** | 9 tools | Infrastructure deployment and management |
| **Private Apps** | 15 tools | Application lifecycle and configuration |
| **Local Brokers** | 7 tools | Network connectivity and routing |
| **Policy Management** | 6 tools | Access control and security rules |
| **SCIM Integration** | 5 tools | Identity and user management |
| **Upgrade Profiles** | 7 tools | Automated maintenance scheduling |
| **Steering** | 3 tools | Traffic routing and associations |
| **Alerts** | 2 tools | Event monitoring and notifications |
| **Search** | 2 tools | Resource discovery and querying |
| **Validation** | 2 tools | Configuration compliance |

## Real-World Usage Examples

### 🏢 "Set up complete NPA infrastructure for our new London office"
**AI Response**: Executes comprehensive deployment workflow
- ✅ Creates publisher with auto-upgrade profile
- ✅ Configures local broker for internal routing  
- ✅ Sets up core business applications (CRM, ERP, File Server)
- ✅ Creates access policies with SCIM group validation
- ✅ Enables monitoring and discovery for office network
- ✅ Generates registration token for field deployment

### 🚨 "URGENT: Security incident - lock down HR/Finance apps immediately"
**AI Response**: Emergency security response workflow
- ✅ Identifies all HR/Finance applications automatically
- ✅ Creates emergency policy group with highest priority
- ✅ Blocks access for all users except incident response team
- ✅ Enhances monitoring for security events
- ✅ Tags applications for incident tracking

### 📊 "Perform comprehensive compliance audit of our NPA environment"
**AI Response**: Automated compliance assessment
- ✅ Audits all publishers for version compliance
- ✅ Identifies applications without access policies
- ✅ Validates SCIM group references in policies
- ✅ Generates compliance score and remediation plan
- ✅ Creates detailed findings report with priorities

## Quick Start

1. **Environment Setup**
   ```bash
   export NETSKOPE_BASE_URL="https://your-tenant.goskope.com"
   export NETSKOPE_TOKEN="your-api-token"
   ```

2. **Install and Run**
   ```bash
   npm install
   npm run build
   npm start
   ```

3. **Connect via MCP Client**
   ```json
   {
     "mcpServers": {
       "netskope-npa": {
         "command": "node",
         "args": ["/path/to/ns-private-access-mcp/build/index.js"],
         "env": {
           "NETSKOPE_BASE_URL": "https://your-tenant.goskope.com",
           "NETSKOPE_TOKEN": "your-api-token"
         }
       }
     }
   }
   ```

## Key Features

### 🤖 AI-Native Design
- Tools designed for LLM interaction with clear descriptions
- Automatic parameter validation and transformation
- Rich error context for troubleshooting

### 🔄 Workflow Orchestration
- Tools automatically coordinate with each other
- Built-in retry logic and error recovery
- Transactional operations where possible

### 🛡️ Production Ready
- Comprehensive input validation using Zod schemas
- Rate limiting and API quota management
- Detailed logging and monitoring

### 🔗 Integration Patterns
- SCIM integration for identity resolution
- Search tools for resource discovery
- Validation tools for compliance checking

## Installation Options

### NPM Package
```bash
npm install @johnneerdael/ns-private-access-mcp
```

### Local Development
```bash
git clone https://github.com/johnneerdael/ns-private-access-mcp.git
cd ns-private-access-mcp
npm install
npm run build
```

## Remote / Hosted Mode (Streamable HTTP)

A public instance of this server is hosted at:

> **`https://privateaccess.ntsk.app/mcp`**

The hosted instance is **multi-tenant and stateless** — it stores no
credentials. Every request must carry **both**:

| Header | Value |
|--------|-------|
| `X-Netskope-Tenant` | `https://<tenant>.goskope.com` (scheme is added if you omit it) |
| `Authorization` | `Bearer <netskope-api-token>` |

`Accept: application/json, text/event-stream` and `Mcp-Session-Id` are
handled by your MCP client automatically — you don't need to set them by hand.

You bring your own tenant URL and API token; they live only in your client
config and travel with each request. Requests missing either header receive
`401 Unauthorized` with a JSON-RPC error pointing at the missing field.

### Install in Claude Code

Claude Code speaks streamable HTTP natively. Add the server with one command:

```bash
claude mcp add --transport http netskope https://privateaccess.ntsk.app/mcp \
  --header "X-Netskope-Tenant: https://YOUR-TENANT.goskope.com" \
  --header "Authorization: Bearer YOUR_NETSKOPE_API_TOKEN"
```

Or, equivalently, add it to `~/.claude.json` (user scope) or `.mcp.json`
(project scope):

```json
{
  "mcpServers": {
    "netskope": {
      "type": "http",
      "url": "https://privateaccess.ntsk.app/mcp",
      "headers": {
        "X-Netskope-Tenant": "https://YOUR-TENANT.goskope.com",
        "Authorization": "Bearer ${NETSKOPE_API_TOKEN}"
      }
    }
  }
}
```

Verify with `claude mcp list` — the server should show up and report
its tool count.

### Install in OpenAI Codex CLI

Codex's `mcp_servers` config currently expects a stdio command, so we use the
[`mcp-remote`](https://www.npmjs.com/package/mcp-remote) bridge (shipped via
`npx`) to translate stdio ↔ streamable HTTP. Add to `~/.codex/config.toml`:

```toml
[mcp_servers.netskope]
command = "npx"
args = [
  "-y", "mcp-remote",
  "https://privateaccess.ntsk.app/mcp",
  "--header", "X-Netskope-Tenant: https://YOUR-TENANT.goskope.com",
  "--header", "Authorization: Bearer ${NETSKOPE_API_TOKEN}",
]

[mcp_servers.netskope.env]
NETSKOPE_API_TOKEN = "your-netskope-api-token"
```

Then `codex mcp list` to confirm Codex sees the server, and Codex will surface
the Netskope tools on its next turn.

> The same `mcp-remote` recipe works for any client that only supports stdio
> MCP servers (older Cursor, Continue, etc.).

### Generic JSON client config

For clients that take a JSON map (Cursor, Windsurf, custom hosts):

```json
{
  "mcpServers": {
    "netskope": {
      "url": "https://privateaccess.ntsk.app/mcp",
      "headers": {
        "X-Netskope-Tenant": "https://YOUR-TENANT.goskope.com",
        "Authorization": "Bearer YOUR_NETSKOPE_API_TOKEN"
      }
    }
  }
}
```

### Self-hosting

Prefer to run your own instance? Two compose files are shipped:

| File | Purpose | Command |
|------|---------|---------|
| `docker-compose.yml` | Run the prebuilt multi-arch image from GHCR. | `docker compose up -d` |
| `docker-compose.build.yml` | Build from local sources (for development). | `docker compose -f docker-compose.build.yml up --build` |

One-liners without compose:

```bash
# Prebuilt image from GHCR
docker run --rm -p 3000:3000 ghcr.io/johnneerdael/ns-private-access-mcp:latest

# Build and run from a local checkout
docker build -t netskope-mcp:local .
docker run --rm -p 3000:3000 netskope-mcp:local

# Or just run the Node entry directly
npm run build && PORT=3000 node dist/cli-http.js
```

The container exposes `/mcp` (streamable HTTP) and `/healthz` (liveness).
Useful env vars:

| Var | Purpose |
|-----|---------|
| `PORT` / `HOST` | Bind address (default `0.0.0.0:3000`). |
| `CORS_ORIGIN` | Comma-separated allowlist for *browser*-based MCP clients (e.g. `https://claude.ai`). Defaults to `*`. Not relevant for CLI clients (Claude Code, Codex, Cursor) or when running behind a reverse proxy that doesn't itself need CORS. |
| `NETSKOPE_BASE_URL` / `NETSKOPE_API_TOKEN` | Optional **fallback** credentials, used only when a client omits the headers. Set both for single-tenant deployments; leave both unset for multi-tenant hosting (the model used by `privateaccess.ntsk.app`). |

## Architecture Highlights

### Tool Composition
Tools are designed to work together through well-defined interfaces:

```typescript
// Example: Creating a private app with validation and tagging
1. validateName() -> Check app name compliance
2. searchPublishers() -> Find target publisher
3. createPrivateApp() -> Create the application  
4. createPrivateAppTags() -> Add organizational tags
5. updatePublisherAssociation() -> Associate with publishers
```

### Schema-Driven Validation
Every tool uses Zod schemas for type safety and validation:

```typescript
const createAppSchema = z.object({
  app_name: z.string().min(1).max(64),
  host: z.string().url(),
  protocols: z.array(protocolSchema),
  clientless_access: z.boolean()
});
```

### Error Resilience
Built-in patterns for handling common issues:
- Automatic parameter extraction from MCP objects
- Retry logic with exponential backoff
- Graceful degradation for partial failures

## Credits

- **John Neerdael** (Netskope Private Access Product Manager)  
- **Mitchell Pompe** (Chief Netskope Solutions Engineer for NL)

## Getting Help

- **Documentation Issues**: Open an issue on GitHub
- **Feature Requests**: Create a feature request issue
- **Bug Reports**: Use the bug report template
- **Security Issues**: See [SECURITY.md](./docs/SECURITY.md)

---

*This MCP server transforms complex Netskope NPA management into simple, AI-driven conversations.*
