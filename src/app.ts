import Fastify from 'fastify';
import { logger } from './core/logger.js';

const app = Fastify({
  loggerInstance: logger,
});

// Health check route
app.get('/health', async () => {
  return { status: 'ok', timestamp: new Date().toISOString() };
});

const start = async () => {
  try {
    const port = Number(process.env.PORT) || 3000;
    await app.listen({ port, host: '0.0.0.0' });
    // app.log is now using our custom pino logger
  } catch (err) {
    app.log.error(err);
    process.exit(1);
  }
};

start();
