import { createServer } from "./server";
import { info } from "shared";

const port = (process.env.PORT as unknown as number) || 3000;
const server = createServer();

server.listen(port, () => {
  info(`Server listening on port ${port}`);
});

export default server;
