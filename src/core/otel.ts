import { NodeSDK } from '@opentelemetry/sdk-node';
import { getNodeAutoInstrumentations } from '@opentelemetry/auto-instrumentations-node';
import { OTLPTraceExporter } from '@opentelemetry/exporter-trace-otlp-http';
import { PrometheusExporter } from '@opentelemetry/exporter-prometheus';
import { resourceFromAttributes } from '@opentelemetry/resources';
import { ATTR_SERVICE_NAME, ATTR_SERVICE_VERSION } from '@opentelemetry/semantic-conventions';
import { logger } from './logger.js';

const sdk = new NodeSDK({
  resource: resourceFromAttributes({
    [ATTR_SERVICE_NAME]: process.env.SERVICE_NAME || 'o11y-first-chassis',
    [ATTR_SERVICE_VERSION]: '1.1.0',
  }),
  traceExporter: new OTLPTraceExporter({
    url: process.env.OTEL_EXPORTER_OTLP_ENDPOINT || 'http://localhost:4318/v1/traces',
  }),
  metricReader: new PrometheusExporter({
    port: 9464, // Default port for Prometheus exporter
  }),
  instrumentations: [getNodeAutoInstrumentations()],
});

try {
  sdk.start();
  logger.info('OpenTelemetry SDK started (Traces + Metrics)');
} catch (error) {
  logger.error({ error }, 'Error starting OpenTelemetry SDK');
}

// Graceful shutdown
process.on('SIGTERM', () => {
  sdk.shutdown()
    .then(() => logger.info('OTEL SDK shut down successfully'))
    .catch((error) => logger.error({ error }, 'Error shutting down OTEL SDK'))
    .finally(() => process.exit(0));
});
