export type SuccessResponse<T extends void> = {
  success: true;
  message?: string;
} & (T extends void ? {} : { data: T });

export type ErrorResponse<T extends void> = {
  success: false;
  message?: string;
} & (T extends void ? {} : { error: T });

export interface LoggerConfig {
  logDir?: string;
  level?: string;
  appName?: string;
  maxFiles?: string;
  maxSize?: string;
  enableConsole?: boolean;
  enableFile?: boolean;
  enableErrorFile?: boolean;
}

export interface RequestLog {
  method: string;
  url: string;
  statusCode: number;
  responseTime: number;
  userAgent?: string;
  ip: string;
  userId?: string | number;
}


