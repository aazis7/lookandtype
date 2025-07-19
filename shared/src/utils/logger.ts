import winston from "winston";
import path from "path";
import type { LogContext } from "../types";

const isDevelopment = process.env.NODE_ENV === "development";
const isProduction = process.env.NODE_ENV === "production";

// Custom log levels with colors
const logLevels = {
  error: 0,
  warn: 1,
  info: 2,
  http: 3,
  verbose: 4,
  debug: 5,
  silly: 6,
};

winston.addColors({
  error: "red",
  warn: "yellow",
  info: "green",
  http: "magenta",
  verbose: "cyan",
  debug: "blue",
  silly: "grey",
});

// Custom format for development
const developmentFormat = winston.format.combine(
  winston.format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
  winston.format.errors({ stack: true }),
  winston.format.colorize({ all: true }),
  winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
    const metaStr = Object.keys(meta).length
      ? JSON.stringify(meta, null, 2)
      : "";
    const stackStr = stack ? `\n${stack}` : "";
    return `${timestamp} [${level}]: ${message}${metaStr ? `\n${metaStr}` : ""}${stackStr}`;
  }),
);

// Custom format for production
const productionFormat = winston.format.combine(
  winston.format.timestamp(),
  winston.format.errors({ stack: true }),
  winston.format.json(),
  winston.format.printf(({ timestamp, level, message, stack, ...meta }) => {
    return JSON.stringify({
      timestamp,
      level,
      message,
      stack,
      ...meta,
    });
  }),
);

// Create transports
const createTransports = () => {
  const transports: winston.transport[] = [];

  // Console transport
  transports.push(
    new winston.transports.Console({
      level: isDevelopment ? "debug" : "info",
      format: isDevelopment ? developmentFormat : productionFormat,
    }),
  );

  // File transports for production
  if (isProduction) {
    // Error log file
    transports.push(
      new winston.transports.File({
        filename: path.join(process.cwd(), "logs", "error.log"),
        level: "error",
        format: productionFormat,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
      }),
    );

    // Combined log file
    transports.push(
      new winston.transports.File({
        filename: path.join(process.cwd(), "logs", "combined.log"),
        format: productionFormat,
        maxsize: 5242880, // 5MB
        maxFiles: 5,
      }),
    );

    // HTTP log file
    transports.push(
      new winston.transports.File({
        filename: path.join(process.cwd(), "logs", "http.log"),
        level: "http",
        format: productionFormat,
        maxsize: 5242880, // 5MB
        maxFiles: 3,
      }),
    );
  }

  return transports;
};

// Create the logger instance
const serverLogger = winston.createLogger({
  levels: logLevels,
  level: isDevelopment ? "debug" : "info",
  format: winston.format.combine(
    winston.format.timestamp(),
    winston.format.errors({ stack: true }),
    winston.format.metadata({ fillExcept: ["message", "level", "timestamp"] }),
  ),
  transports: createTransports(),
  exitOnError: false,
});

// Enhanced logger with context support
class ServerLogger {
  private logger: winston.Logger;

  constructor(logger: winston.Logger) {
    this.logger = logger;
  }

  private formatMessage(message: string, context?: LogContext) {
    return {
      message,
      ...context,
      service: "server",
      environment: process.env.NODE_ENV,
      pid: process.pid,
    };
  }

  error(message: string, context?: LogContext) {
    this.logger.error(this.formatMessage(message, context));
  }

  warn(message: string, context?: LogContext) {
    this.logger.warn(this.formatMessage(message, context));
  }

  info(message: string, context?: LogContext) {
    this.logger.info(this.formatMessage(message, context));
  }

  http(message: string, context?: LogContext) {
    this.logger.http(this.formatMessage(message, context));
  }

  debug(message: string, context?: LogContext) {
    this.logger.debug(this.formatMessage(message, context));
  }

  verbose(message: string, context?: LogContext) {
    this.logger.verbose(this.formatMessage(message, context));
  }

  silly(message: string, context?: LogContext) {
    this.logger.silly(this.formatMessage(message, context));
  }

  // Express middleware for HTTP logging
  middleware() {
    return (req: any, res: any, next: any) => {
      const start = Date.now();
      const requestId = Math.random().toString(36).substr(2, 9);

      req.requestId = requestId;

      // Log request
      this.http("HTTP Request", {
        requestId,
        // @ts-expect-error no-type-defs
        method: req.method,
        url: req.url,
        userAgent: req.get("User-Agent"),
        ip: req.ip,
      });

      // Override res.end to log response
      const originalEnd = res.end;
      res.end = function (...args: any[]) {
        const duration = Date.now() - start;

        serverLogger.http("HTTP Response", {
          requestId,
          method: req.method,
          url: req.url,
          statusCode: res.statusCode,
          duration: `${duration}ms`,
        });

        originalEnd.apply(res, args);
      };

      next();
    };
  }

  // Graceful shutdown
  async close() {
    return new Promise<void>((resolve) => {
      this.logger.end(() => {
        resolve();
      });
    });
  }
}

export const logger = new ServerLogger(serverLogger);
