import { AsyncLocalStorage } from 'node:async_hooks';

export interface NetskopeRequestContext {
  baseUrl: string;
  apiToken: string;
}

export const requestContext = new AsyncLocalStorage<NetskopeRequestContext>();

export function getRequestContext(): NetskopeRequestContext | undefined {
  return requestContext.getStore();
}
