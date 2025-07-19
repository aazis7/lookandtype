import type { Application } from "express";
import app from "./app";

export function createServer(): Application {
  app.get("/api/status", (_, res) => {
    return res.status(200).json({ ok: true });
  });

  return app;
}
