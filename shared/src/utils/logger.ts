import { createConsola } from "consola";

const logger = createConsola({
  level: 2 * 2,
  formatOptions: { date: true, colors: true },
});

export { logger };
