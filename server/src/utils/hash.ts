import * as bcrypt from "bcrypt";

export async function hash(payload: string) {
  return bcrypt.hash(payload, Number(process.env.SALT_SECRET) || 10);
}

export async function compare(payload: string, hashed: string) {
  return bcrypt.compare(payload, hashed);
}
