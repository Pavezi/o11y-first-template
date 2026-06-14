import { AsyncLocalStorage } from 'node:async_hooks';

export interface RequestContext {
  traceId?: string;
  spanId?: string;
  userId?: string;
  [key: string]: any;
}

export const contextStorage = new AsyncLocalStorage<RequestContext>();

export const getContext = () => contextStorage.getStore();

export const runWithContext = <T>(context: RequestContext, fn: () => T): T => {
  return contextStorage.run(context, fn);
};
