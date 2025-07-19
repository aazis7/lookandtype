import type { CookieOptions } from "express";
import { env } from "../env";

export const cookieOptions = {
  secure: env.NODE_ENV === "development",
  sameSite: "strict",
  httpOnly: true,
  expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
  path: "/",
} satisfies CookieOptions;
