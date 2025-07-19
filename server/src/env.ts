import { z } from "zod";

const EnvSchema = z.object({
  NODE_ENV: z
    .enum(["development", "production", "test"])
    .default("development"),
  PORT: z.number().min(3000).max(65556).positive().default(3000),
  TURSO_CONNECTION_URL: z.url(),
  TURSO_AUTH_TOKEN: z.string(),
});

function makeEnv() {
  const parsedEnv = EnvSchema.safeParse(process.env);

  if (!parsedEnv.success) {
    const formatted = parsedEnv.error.flatten();

    console.error("❌ Invalid environment variables:");
    console.error(JSON.stringify(formatted.fieldErrors, null, 2));

    throw new Error("Invalid environment variables");
  }

  return parsedEnv.data;
}

export const env = makeEnv();
