import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";
import { env } from "../env";

const url = env.TURSO_CONNECTION_URL;
const authToken = env.TURSO_AUTH_TOKEN;

type DB = ReturnType<typeof drizzle<typeof schema>>;

const globalForDb = globalThis as unknown as {
  db: DB | undefined;
};

const db = drizzle({ connection: { url, authToken }, schema });

if (env.NODE_ENV === "development") globalForDb.db = db;

export { db };
