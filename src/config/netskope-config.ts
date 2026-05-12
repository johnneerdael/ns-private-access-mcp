import dotenv from 'dotenv';
import { z } from "zod";
import { getRequestContext } from '../utils/request-context.js';

dotenv.config();

// baseUrl and apiToken are optional at boot so the server can run in HTTP
// mode where credentials arrive per request (via headers → AsyncLocalStorage).
// They are still required at request time — see ApiClient.request.
export const configSchema = z.object({
  baseUrl: z.union([z.string().url(), z.literal('')]).default(''),
  apiToken: z.string().default(''),
  timeout: z.number().positive().default(30000),
  retryAttempts: z.number().nonnegative().default(3),
  retryDelay: z.number().nonnegative().default(1000),
  cacheTTL: z.number().nonnegative().default(300), // 5 minutes
  cacheSize: z.number().positive().default(1000)
});

export type Config = z.infer<typeof configSchema>;

const defaultConfig: Partial<Config> = {
  timeout: 10000, // Reduced from 30s to 10s
  retryAttempts: 1, // Reduced from 3 to 1 for faster debugging
  retryDelay: 500, // Reduced from 1000ms to 500ms
  cacheTTL: 300,
  cacheSize: 1000
};

export function loadConfig(): Config {
  const config = {
    baseUrl: process.env.NETSKOPE_BASE_URL,
    apiToken: process.env.NETSKOPE_API_TOKEN || process.env.NETSKOPE_API_KEY,
    timeout: parseInt(process.env.NETSKOPE_TIMEOUT ?? String(defaultConfig.timeout)),
    retryAttempts: parseInt(process.env.NETSKOPE_RETRY_ATTEMPTS ?? String(defaultConfig.retryAttempts)),
    retryDelay: parseInt(process.env.NETSKOPE_RETRY_DELAY ?? String(defaultConfig.retryDelay)),
    cacheTTL: parseInt(process.env.NETSKOPE_CACHE_TTL ?? String(defaultConfig.cacheTTL)),
    cacheSize: parseInt(process.env.NETSKOPE_CACHE_SIZE ?? String(defaultConfig.cacheSize))
  };

  const result = configSchema.safeParse(config);
  if (!result.success) {
    const errors = result.error.errors
      .map(err => `${err.path.join('.')}: ${err.message}`)
      .join('\n');
    throw new Error(`Invalid configuration:\n${errors}`);
  }

  return result.data;
}

export class ApiClient {
  private config: Config;
  private cache: Map<string, {data: any, timestamp: number}>;

  constructor(config: Config) {
    this.config = config;
    this.cache = new Map();
  }

  private getCacheKey(path: string, options: RequestInit): string {
    return `${options.method || 'GET'}:${path}:${options.body || ''}`;
  }

  private isCacheValid(timestamp: number): boolean {
    return (Date.now() - timestamp) < (this.config.cacheTTL * 1000);
  }

  async request<T>(path: string, options: RequestInit = {}): Promise<T> {
    const startTime = Date.now();
    const cacheKey = this.getCacheKey(path, options);
    
    if (options.method === 'GET') {
      const cached = this.cache.get(cacheKey);
      if (cached && this.isCacheValid(cached.timestamp)) {
        return cached.data;
      }
    }

    // Resolve credentials in priority order: per-request context (HTTP mode)
    // → in-memory config (stdio mode) → environment fallback.
    const ctx = getRequestContext();
    const baseUrl =
      ctx?.baseUrl || this.config.baseUrl || process.env.NETSKOPE_BASE_URL;
    const apiToken =
      ctx?.apiToken ||
      process.env.NETSKOPE_API_TOKEN ||
      process.env.NETSKOPE_API_KEY;
    if (!baseUrl) {
      throw new Error(
        'Netskope tenant base URL not provided. Set NETSKOPE_BASE_URL or pass X-Netskope-Tenant header.'
      );
    }
    if (!apiToken) {
      throw new Error(
        'Netskope API token not provided. Set NETSKOPE_API_TOKEN or pass Authorization: Bearer <token>.'
      );
    }
    const url = new URL(path, baseUrl);
    const headers = new Headers(options.headers);
    headers.set('Authorization', `Bearer ${apiToken}`);
    headers.set('Content-Type', 'application/json');


    const controller = new AbortController();
    const timeoutId = setTimeout(() => {
      controller.abort();
    }, this.config.timeout);

    try {
      const response = await fetch(url.toString(), {
        ...options,
        headers,
        signal: controller.signal
      });


      if (!response.ok) {
        // Log non-2xx upstream responses with status + a short body excerpt so
        // we can tell auth issues from real backend errors.
        let bodyExcerpt = '';
        try {
          const text = await response.clone().text();
          bodyExcerpt = text.slice(0, 200);
        } catch {
          // ignore — best-effort
        }
        console.error(
          JSON.stringify({
            ts: new Date().toISOString(),
            msg: 'upstream-error',
            url: url.toString(),
            method: options.method ?? 'GET',
            status: response.status,
            statusText: response.statusText,
            body: bodyExcerpt,
            durMs: Math.round(Date.now() - startTime),
          })
        );
        throw new Error(`API request failed: ${response.status} ${response.statusText}`);
      }

      const data = await response.json() as T;

      if (options.method === 'GET') {
        if (this.cache.size >= this.config.cacheSize) {
          const oldestKey = [...this.cache.entries()]
            .sort(([,a], [,b]) => a.timestamp - b.timestamp)[0][0];
          this.cache.delete(oldestKey);
        }
        this.cache.set(cacheKey, {data, timestamp: Date.now()});
      }

      return data;
    } catch (error) {
      // Network-layer failures (DNS, ECONNREFUSED, TLS, AbortError) reach
      // here as TypeError('fetch failed') with a .cause. Surface both so
      // container logs explain "fetch failed" without re-running.
      const err = error as Error & { cause?: unknown };
      const cause = err.cause as
        | { code?: string; errno?: string; message?: string; hostname?: string }
        | undefined;
      console.error(
        JSON.stringify({
          ts: new Date().toISOString(),
          msg: 'upstream-fetch-failed',
          url: url.toString(),
          method: options.method ?? 'GET',
          error: err.message,
          causeCode: cause?.code ?? null,
          causeErrno: cause?.errno ?? null,
          causeHostname: cause?.hostname ?? null,
          causeMessage: cause?.message ?? null,
          aborted: controller.signal.aborted || null,
          durMs: Math.round(Date.now() - startTime),
        })
      );
      throw error;
    } finally {
      clearTimeout(timeoutId);
    }
  }

  async requestWithRetry<T>(path: string, options: RequestInit = {}): Promise<T> {
    let lastError: Error | undefined;

    for (let attempt = 0; attempt < this.config.retryAttempts; attempt++) {
      try {
        return await this.request<T>(path, options);
      } catch (error) {
        lastError = error as Error;
        if (error instanceof Error && error.message.includes('4')) {
          throw error;
        }
        if (attempt < this.config.retryAttempts - 1) {
          const delay = this.config.retryDelay * Math.pow(2, attempt);
          const jitter = Math.random() * 1000;
          await new Promise(resolve => setTimeout(resolve, delay + jitter));
        }
      }
    }

    throw lastError;
  }
}

export const api = new ApiClient(loadConfig());