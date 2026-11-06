/**
 * cors.js
 * What:  Decides which websites may call the API from a browser (mandate Section 6: an allow-list,
 *        never "*" for a site that may later have logins).
 * Used by: app.js
 * Talks to: cors, config/env.js
 */
import cors from "cors";
import { env } from "./env.js";

// Requests with no Origin header (same-site pages behind the proxy, curl, health checks) pass.
// Cross-site browser requests pass only when the origin is listed in CORS_ORIGINS.
export const corsMiddleware = cors({
  origin: (origin, callback) =>
    callback(null, !origin || env.corsOrigins.includes(origin)),
  methods: ["GET", "POST", "OPTIONS"],
  allowedHeaders: ["Content-Type", "X-Request-Id"],
  maxAge: 600,
});
