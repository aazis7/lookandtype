import winston, { Logger as WinstonLogger, format } from "winston";
import DailyRotateFile from "winston-daily-rotate-file";
import * as path from "path";
import * as fs from "fs";
import { LoggerConfig } from "../types";

export class Logger {
  private instance: WinstonLogger;
  private config: Required<LoggerConfig>;

  constructor(options: LoggerConfig = {}) {
    this.config = {
      logDir: options.logDir || "logs",
      level: options.level || process.env.LOG_LEVEL || "info",
      appName: options.appName || "server",
      maxFiles: options.maxFiles || "14d",
      maxSize: options.maxSize || "20m",
      enableConsole: options.enableConsole ?? true,
      enableFile: options.enableFile ?? true,
      enableErrorFile: options.enableErrorFile ?? true,
    };

    if (this.config.enableFile || this.config.enableErrorFile) {
      const canCreateDir = this.ensureLogDir();
      if (!canCreateDir) {
        this.config.enableFile = false;
        this.config.enableErrorFile = false;
      }
    }

    this.instance = this.createLogger();
  }

  private ensureLogDir(): boolean {
    try {
      if (!fs.existsSync(this.config.logDir)) {
        fs.mkdirSync(this.config.logDir, { recursive: true });
      }
      return true;
    } catch (error) {
      // File system not writable (e.g., AWS Lambda, Docker with read-only filesystem)
      console.warn(
        `[Logger] Cannot create log directory '${this.config.logDir}'. File logging disabled.`,
      );
      return false;
    }
  }

  private createLogger(): WinstonLogger {
    const customFormat = format.combine(
      format.timestamp({ format: "YYYY-MM-DD HH:mm:ss" }),
      format.errors({ stack: true }),
      format.json(),
      format.printf(({ timestamp, level, message, stack, ...meta }) => {
        const logObj: any = {
          timestamp,
          level,
          message,
          app: this.config.appName,
        };

        if (stack) logObj.stack = stack;
        if (Object.keys(meta).length > 0) logObj.meta = meta;

        return JSON.stringify(logObj);
      }),
    );

    const consoleFormat = format.combine(
      format.colorize(),
      format.timestamp({ format: "HH:mm:ss" }),
      format.printf(({ timestamp, level, message, stack }) => {
        return `${timestamp} [${level}]: ${message}${stack ? "\n" + stack : ""}`;
      }),
    );

    const transports: winston.transport[] = [];

    // Console transport
    if (this.config.enableConsole) {
      transports.push(
        new winston.transports.Console({
          level: this.config.level,
          format: consoleFormat,
        }),
      );
    }

    // File transport for all logs
    if (this.config.enableFile) {
      transports.push(
        new DailyRotateFile({
          filename: path.join(
            this.config.logDir,
            `${this.config.appName}-%DATE%.log`,
          ),
          datePattern: "YYYY-MM-DD",
          maxFiles: this.config.maxFiles,
          maxSize: this.config.maxSize,
          format: customFormat,
          level: this.config.level,
        }),
      );
    }

    // Error file transport
    if (this.config.enableErrorFile) {
      transports.push(
        new DailyRotateFile({
          filename: path.join(
            this.config.logDir,
            `${this.config.appName}-error-%DATE%.log`,
          ),
          datePattern: "YYYY-MM-DD",
          maxFiles: this.config.maxFiles,
          maxSize: this.config.maxSize,
          format: customFormat,
          level: "error",
        }),
      );
    }

    return winston.createLogger({
      level: this.config.level,
      transports,
      exitOnError: false,
    });
  }

  // Logging methods
  public error(message: string, meta?: any): void {
    this.instance.error(message, meta);
  }

  public warn(message: string, meta?: any): void {
    this.instance.warn(message, meta);
  }

  public info(message: string, meta?: any): void {
    this.instance.info(message, meta);
  }

  public debug(message: string, meta?: any): void {
    this.instance.debug(message, meta);
  }

  public verbose(message: string, meta?: any): void {
    this.instance.verbose(message, meta);
  }

  public getLogger(): WinstonLogger {
    return this.instance;
  }
}

export const logger = new Logger();
