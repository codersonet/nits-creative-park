/**
 * app.js
 * What:  Builds the Express app: middleware in the right order, then routes. It never listens
 *        on a port (server.js does), so tests can use it directly.
 * Used by: server.js, tests/integration
 * Talks to: config/*, logger/httpLogger.js, middleware/*, routes/*
 */
import express from "express";
import { corsMiddleware } from "./config/cors.js";
import { env } from "./config/env.js";
import { httpLogger } from "./logger/httpLogger.js";
import {
  errorHandler,
  notFoundHandler,
} from "./middleware/error.middleware.js";
import { globalLimiter } from "./middleware/rateLimit.middleware.js";
import { requestId } from "./middleware/requestId.middleware.js";
import { securityMiddleware } from "./middleware/security.middleware.js";
import healthRoutes from "./routes/health.routes.js";
import apiRoutes from "./routes/index.js";

// Creates a fresh app. The order below matters: each step runs before the next.
export function createApp() {
  const app = express();

  app.disable("x-powered-by");
  // WHY: behind Nginx the real visitor address is in X-Forwarded-For; rate limits need it.
  app.set("trust proxy", env.trustProxy);

  app.use(requestId);
  app.use(httpLogger);
  app.use(securityMiddleware);
  app.use(corsMiddleware);

  // Health checks come before the rate limit, so a busy site is never reported as down.
  app.use(healthRoutes);

  app.use("/api", globalLimiter);
  // WHY 10kb: the biggest valid message is about 2.5kb. Larger bodies are refused with 413.
  app.use("/api", express.json({ limit: "10kb" }));
  app.use("/api/v1", apiRoutes);

  app.use(notFoundHandler);
  app.use(errorHandler);
  return app;
}
