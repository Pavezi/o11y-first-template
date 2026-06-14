import CircuitBreaker from 'opossum';
import { logger } from './logger.js';
import { trace, SpanStatusCode } from '@opentelemetry/api';
import { ErrorFactory } from '../shared/errors.js';

export interface ResilienceOptions {
  timeout?: number;
  errorThresholdPercentage?: number;
  resetTimeout?: number;
  name: string;
}

export class ResilienceProvider {
  static createCircuitBreaker<T, Args extends any[]>(
    action: (...args: Args) => Promise<T>,
    options: ResilienceOptions
  ): CircuitBreaker<Args, T> {
    const breaker = new CircuitBreaker(action, {
      timeout: options.timeout || 3000,
      errorThresholdPercentage: options.errorThresholdPercentage || 50,
      resetTimeout: options.resetTimeout || 30000,
    });

    const tracer = trace.getTracer('resilience-provider');

    breaker.on('open', () => {
      logger.warn({ name: options.name }, 'Circuit Breaker OPEN');
    });

    breaker.on('close', () => {
      logger.info({ name: options.name }, 'Circuit Breaker CLOSED');
    });

    breaker.on('halfOpen', () => {
      logger.info({ name: options.name }, 'Circuit Breaker HALF_OPEN');
    });

    // Instrument breaker with OpenTelemetry
    breaker.fallback(() => {
      throw ErrorFactory.circuitBreaker(`Service ${options.name} is currently unavailable`);
    });

    return breaker;
  }
}
