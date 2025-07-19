import { createServer } from "./server";
import { logger } from "shared";

const port = (process.env.PORT as unknown as number) || 3000;
const server = createServer();

server.listen(port, () => {
  logger.info(`Server listening on port ${port}`);
});

export default server;
