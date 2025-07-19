import { logger as createLogger } from "shared";

export const logger = createLogger.create({
  level: process.env.NODE_ENV === "production" ? 3 : 5,
});
