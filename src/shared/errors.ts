export enum ErrorCode {
  VALIDATION_ERROR = 'VALIDATION_ERROR',
  NOT_FOUND = 'NOT_FOUND',
  CONFLICT = 'CONFLICT',
  UNAUTHORIZED = 'UNAUTHORIZED',
  FORBIDDEN = 'FORBIDDEN',
  INTERNAL_ERROR = 'INTERNAL_ERROR',
  CIRCUIT_BREAKER_OPEN = 'CIRCUIT_BREAKER_OPEN',
  TIMEOUT = 'TIMEOUT',
}

export interface ErrorDetails {
  [key: string]: any;
}

export class AppError extends Error {
  public readonly code: ErrorCode;
  public readonly statusCode: number;
  public readonly details?: ErrorDetails;
  public readonly isOperational: boolean;

  constructor(
    code: ErrorCode,
    message: string,
    statusCode: number = 500,
    isOperational: boolean = true,
    details?: ErrorDetails
  ) {
    super(message);
    this.name = this.constructor.name;
    this.code = code;
    this.statusCode = statusCode;
    this.isOperational = isOperational;
    this.details = details;
    Error.captureStackTrace(this, this.constructor);
  }
}

export class ErrorFactory {
  static validation(message: string, details?: ErrorDetails): AppError {
    return new AppError(ErrorCode.VALIDATION_ERROR, message, 400, true, details);
  }

  static notFound(message: string = 'Resource not found'): AppError {
    return new AppError(ErrorCode.NOT_FOUND, message, 404);
  }

  static conflict(message: string): AppError {
    return new AppError(ErrorCode.CONFLICT, message, 409);
  }

  static unauthorized(message: string = 'Unauthorized access'): AppError {
    return new AppError(ErrorCode.UNAUTHORIZED, message, 401);
  }

  static forbidden(message: string = 'Forbidden access'): AppError {
    return new AppError(ErrorCode.FORBIDDEN, message, 403);
  }

  static internal(message: string = 'Internal server error', details?: ErrorDetails): AppError {
    return new AppError(ErrorCode.INTERNAL_ERROR, message, 500, false, details);
  }

  static circuitBreaker(message: string = 'Service temporarily unavailable'): AppError {
    return new AppError(ErrorCode.CIRCUIT_BREAKER_OPEN, message, 503);
  }
}
