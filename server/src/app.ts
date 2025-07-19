import express, { type Application } from "express";
import cors from "cors";
import compression from "compression";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import morgan from "morgan";
import path from "path";

const app: Application = express();

app.disable("x-powered-by");

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(
  cors({
    origin:
      process.env.NODE_ENV === "development" ? "*" : process.env.FRONTEND_URL,
    credentials: true,
    allowedHeaders: ["Content-Type", "Authorization"],
    exposedHeaders: ["Content-Length"],
    methods: ["GET", "POST", "PATCH", "PUT", "DELETE"],
  }),
);
app.use(cookieParser());
app.use(morgan("dev"));
app.use(
  helmet({
    contentSecurityPolicy: false,
  }),
);
app.use(compression());

app.get("/api/status", (_, res) => {
  res.status(200).json({ ok: true });
});

// Serve static files from React build (Vite dist folder)
app.use(express.static(path.join(__dirname, "..", "..", "client", "dist")));

// Catch all handler: send back React's index.html file for client-side routing
app.get("*", (req, res) => {
  // Don't serve index.html for API routes
  if (req.path.startsWith("/api")) {
    return res.status(404).json({ error: "API route not found" });
  }

  res.sendFile(
    path.join(__dirname, "..", "..", "client", "dist", "index.html"),
  );
});

export default app;
