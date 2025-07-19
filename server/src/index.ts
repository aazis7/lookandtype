import { createServer } from "./server";

const port = (process.env.PORT as unknown as number) || 3000;
const server = createServer();

server.listen(port, () => {
  console.log(`Server listening on port ${port}`);
});

export default server;
