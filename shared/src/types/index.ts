export type SuccessResponse<T extends void> = {
  success: true;
  message?: string;
} & (T extends void ? {} : { data: T });

export type ErrorResponse<T extends void> = {
  success: false;
  message?: string;
} & (T extends void ? {} : { error: T });

export interface LogLevel {
  error: 0;
  warn: 1;
  info: 2;
  http: 3;
  verbose: 4;
  debug: 5;
  silly: 6;
}

export interface LogContext {
  userId?: string;
  requestId?: string;
  component?: string;
  action?: string;
  metadata?: Record<string, any>;
}

export interface Logger {
  error(message: string, context?: LogContext): void;
  warn(message: string, context?: LogContext): void;
  info(message: string, context?: LogContext): void;
  http(message: string, context?: LogContext): void;
  debug(message: string, context?: LogContext): void;
  verbose(message: string, context?: LogContext): void;
  silly(message: string, context?: LogContext): void;
}
