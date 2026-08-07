import express from "express";
import cors from "cors";

import skillRoutes from "./routes.js";

const app = express();

// ─── CORS ────────────────────────────────────────────────────────────────────
// Allow localhost (dev) and the deployed Vercel frontend (production).
// Never use wildcard origins in production.
const ALLOWED_ORIGINS = [
  "http://localhost:5173",
  "http://localhost:4173", // vite preview
];

if (process.env.FRONTEND_URL) {
  ALLOWED_ORIGINS.push(process.env.FRONTEND_URL);
}

app.use(
  cors({
    origin: (origin, callback) => {
      // Allow requests with no origin (curl, Postman, server-to-server)
      if (!origin) return callback(null, true);

      if (ALLOWED_ORIGINS.includes(origin)) {
        return callback(null, true);
      }

      callback(new Error(`CORS: Origin '${origin}' is not allowed`));
    },
    credentials: true,
  })
);

// ─── Body Parsing ─────────────────────────────────────────────────────────────
app.use(express.json());

// ─── Health Check ─────────────────────────────────────────────────────────────
app.get("/health", (_req, res) => {
  res.status(200).json({ status: "ok", service: "DevAtlas API" });
});

// ─── Routes ───────────────────────────────────────────────────────────────────
app.use("/api", skillRoutes);

app.get("/", (_req, res) => {
  res.json({
    success: true,
    message: "DevAtlas API Running 🚀",
    version: "1.0.0",
  });
});

// ─── 404 Handler ─────────────────────────────────────────────────────────────
app.use((_req, res) => {
  res.status(404).json({ message: "Route not found" });
});

// ─── Global Error Handler ─────────────────────────────────────────────────────
// eslint-disable-next-line no-unused-vars
app.use((err, _req, res, _next) => {
  const isDev = process.env.NODE_ENV !== "production";
  console.error(err);

  res.status(err.status || 500).json({
    message: err.message || "Internal Server Error",
    ...(isDev && { stack: err.stack }),
  });
});

export default app;