import pino from 'pino';
import { getContext } from './context.js';

const isDevelopment = process.env.NODE_ENV === 'development' || !process.env.NODE_ENV;

export const logger = pino({
  level: process.env.LOG_LEVEL || 'info',
  mixin() {
    const context = getContext();
    if (context) {
      return {
        trace_id: context.traceId,
        span_id: context.spanId,
        user_id: context.userId,
      };
    }
    return {};
  },
  transport: isDevelopment
    ? {
        target: 'pino-pretty',
        options: {
          colorize: true,
          translateTime: 'HH:MM:ss Z',
          ignore: 'pid,hostname',
        },
      }
    : undefined,
  formatters: {
    level: (label) => {
      return { level: label.toUpperCase() };
    },
  },
  timestamp: pino.stdTimeFunctions.isoTime,
});
