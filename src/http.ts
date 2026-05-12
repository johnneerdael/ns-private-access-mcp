import express, { type Request, type Response } from 'express';
import cors from 'cors';
import { randomUUID } from 'node:crypto';
import { StreamableHTTPServerTransport } from '@modelcontextprotocol/sdk/server/streamableHttp.js';
import { isInitializeRequest } from '@modelcontextprotocol/sdk/types.js';
import { NetskopeServer } from './server.js';
import { requestContext, type NetskopeRequestContext } from './utils/request-context.js';

const transports = new Map<string, StreamableHTTPServerTransport>();

// One McpServer instance fans out to many sessions. Each new initialize
// creates a fresh transport that connects back to this same server.
const mcp = new NetskopeServer();

function normalizeTenant(value: string): string {
  const trimmed = value.trim().replace(/\/+$/, '');
  return /^https?:\/\//i.test(trimmed) ? trimmed : `https://${trimmed}`;
}

function extractCreds(req: Request): NetskopeRequestContext | undefined {
  const tenantHeader =
    req.header('x-netskope-tenant') ||
    req.header('x-netskope-base-url');
  const auth = req.header('authorization');
  const bearer = auth?.toLowerCase().startsWith('bearer ')
    ? auth.slice(7).trim()
    : undefined;

  const baseUrl = tenantHeader
    ? normalizeTenant(tenantHeader)
    : process.env.NETSKOPE_BASE_URL ?? '';
  const apiToken =
    bearer ??
    process.env.NETSKOPE_API_TOKEN ??
    process.env.NETSKOPE_API_KEY ??
    '';

  if (!baseUrl || !apiToken) return undefined;
  return { baseUrl, apiToken };
}

function unauthorized(res: Response, id: unknown = null) {
  res.status(401).json({
    jsonrpc: '2.0',
    id,
    error: {
      code: -32001,
      message:
        'Missing Netskope credentials. Provide X-Netskope-Tenant: https://<tenant>.goskope.com and Authorization: Bearer <api-token>.',
    },
  });
}

export async function startHttpServer(
  port = Number(process.env.PORT ?? 3000),
  host = process.env.HOST ?? '0.0.0.0'
) {
  const app = express();
  app.use(express.json({ limit: '4mb' }));
  app.use(
    cors({
      origin: process.env.CORS_ORIGIN?.split(',').map((s) => s.trim()) ?? '*',
      exposedHeaders: [
        'Mcp-Session-Id',
        'Mcp-Protocol-Version',
        'WWW-Authenticate',
      ],
      allowedHeaders: [
        'Content-Type',
        'Authorization',
        'Mcp-Session-Id',
        'Mcp-Protocol-Version',
        'X-Netskope-Tenant',
        'X-Netskope-Base-Url',
      ],
    })
  );

  app.get('/healthz', (_req, res) => {
    res.json({ ok: true, sessions: transports.size });
  });

  app.post('/mcp', async (req, res) => {
    const creds = extractCreds(req);
    if (!creds) {
      unauthorized(res, (req.body as { id?: unknown })?.id ?? null);
      return;
    }

    const sessionId = req.header('mcp-session-id');
    let transport = sessionId ? transports.get(sessionId) : undefined;

    if (!transport) {
      if (!isInitializeRequest(req.body)) {
        res.status(400).json({
          jsonrpc: '2.0',
          id: null,
          error: {
            code: -32000,
            message:
              'Bad Request: no valid session and request is not an initialize.',
          },
        });
        return;
      }
      transport = new StreamableHTTPServerTransport({
        sessionIdGenerator: () => randomUUID(),
        onsessioninitialized: (sid) => {
          transports.set(sid, transport!);
        },
      });
      transport.onclose = () => {
        if (transport!.sessionId) transports.delete(transport!.sessionId);
      };
      await mcp.connect(transport);
    }

    await requestContext.run(creds, async () => {
      await transport!.handleRequest(req, res, req.body);
    });
  });

  const sessionStream = async (req: Request, res: Response) => {
    const creds = extractCreds(req);
    if (!creds) {
      unauthorized(res);
      return;
    }
    const sessionId = req.header('mcp-session-id');
    const transport = sessionId ? transports.get(sessionId) : undefined;
    if (!transport) {
      res.status(400).send('Invalid or missing Mcp-Session-Id');
      return;
    }
    await requestContext.run(creds, async () => {
      await transport.handleRequest(req, res);
    });
  };
  app.get('/mcp', sessionStream);
  app.delete('/mcp', sessionStream);

  return new Promise<void>((resolve) => {
    app.listen(port, host, () => {
      // Log on stderr so it doesn't clash with stdio-mode JSON-RPC.
      console.error(
        `Netskope MCP HTTP server listening on http://${host}:${port}/mcp`
      );
      resolve();
    });
  });
}
