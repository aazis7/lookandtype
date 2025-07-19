import { drizzle } from "drizzle-orm/libsql";
import * as schema from "./schema";

const url = process.env.TURSO_CONNECTION_URL as string;
const authToken = process.env.TURSO_AUTH_TOKEN as string;

type DB = ReturnType<typeof drizzle<typeof schema>>;

const globalForDb = globalThis as unknown as {
  db: DB | undefined;
};

const db = drizzle({ connection: { url, authToken }, schema });

if (process.env.NODE_ENV === "development") globalForDb.db = db;

export { db };
