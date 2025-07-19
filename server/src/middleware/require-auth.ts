import { asyncHandler } from "../utils/async-handler";
import { verify } from "../lib/jwt";

export const requireAuth = asyncHandler(async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader?.split(" ")[1];
  if (!token) return res.sendStatus(401);

  const payload = await verify(token);

  if (!payload) return res.sendStatus(403);

  req.user = { id: payload.sub };
});
