import Fastify from 'fastify';
import { logger } from './core/logger.js';
import { trace, context as otelContext } from '@opentelemetry/api';
import { runWithContext } from './core/context.js';
import { AppError, ErrorCode } from './shared/errors.js';
import { ResilienceProvider } from './core/resilience.js';

const app = Fastify({
  loggerInstance: logger,
  disableRequestLogging: true, // We will handle logging manually for better control
});

// Middleware for Context Propagation
app.addHook('onRequest', (request, reply, done) => {
  const span = trace.getSpan(otelContext.active());
  const traceId = span?.spanContext().traceId;
  const spanId = span?.spanContext().spanId;

  runWithContext({ traceId, spanId }, () => {
    done();
  });
});

// Request Logging with Context
app.addHook('onResponse', (request, reply, done) => {
  const duration = reply.elapsedTime;
  logger.info({
    method: request.method,
    url: request.url,
    statusCode: reply.statusCode,
    duration: `${duration.toFixed(2)}ms`,
  }, 'Request processed');
  done();
});

// Global Error Handler
app.setErrorHandler((error, request, reply) => {
  if (error instanceof AppError) {
    logger.error({ 
      code: error.code, 
      details: error.details,
      stack: error.stack 
    }, error.message);

    return reply.status(error.statusCode).send({
      error: {
        code: error.code,
        message: error.message,
        details: error.details,
      },
    });
  }

  // Generic Error handling
  logger.error({ err: error }, 'Unhandled Error');
  
  reply.status(500).send({
    error: {
      code: ErrorCode.INTERNAL_ERROR,
      message: 'An unexpected error occurred',
    },
  });
});

// Health check route
app.get('/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

// Test error route
app.get('/test-error', async () => {
  throw new AppError(ErrorCode.VALIDATION_ERROR, 'This is a test validation error', 400, true, { field: 'test' });
});

// Simulated external service that fails
const unreliableService = async (shouldFail: boolean) => {
  if (shouldFail) {
    throw new Error('Remote service failure');
  }
  return { data: 'Success from remote service' };
};

const breaker = ResilienceProvider.createCircuitBreaker(unreliableService, {
  name: 'external-api',
  errorThresholdPercentage: 50,
  resetTimeout: 5000,
});

app.get('/test-breaker', async (request, reply) => {
  const { fail } = request.query as { fail?: string };
  try {
    const result = await breaker.fire(fail === 'true');
    return result;
  } catch (error) {
    throw error;
  }
});

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3000;
    await app.listen({ port, host: '0.0.0.0' });
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
