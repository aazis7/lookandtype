import type { LoggerConfig } from "../types";
import { Logger } from "./logger";

function createConsoleLogger(
  options: Omit<LoggerConfig, "enableFile" | "enableErrorFile"> = {},
): Logger {
  return new Logger({
    ...options,
    enableFile: false,
    enableErrorFile: false,
  });
}

export const consoleLogger = createConsoleLogger();

export const error = (message: string, meta?: any) =>
  consoleLogger.error(message, meta);
export const warn = (message: string, meta?: any) =>
  consoleLogger.warn(message, meta);
export const info = (message: string, meta?: any) =>
  consoleLogger.info(message, meta);
export const debug = (message: string, meta?: any) =>
  consoleLogger.debug(message, meta);
export const verbose = (message: string, meta?: any) =>
  consoleLogger.verbose(message, meta);
