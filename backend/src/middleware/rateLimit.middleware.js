/**
 * rateLimit.middleware.js
 * What:  Limits how often one address may call the API (mandate Section 6). Counts live in
 *        Redis when it is available, so every API copy shares them. If Redis is down the limit
 *        is skipped rather than blocking everyone.
 * Used by: app.js, routes/contact.routes.js
 * Talks to: express-rate-limit, rate-limit-redis, config/cache.js, config/env.js
 */
import rateLimit from "express-rate-limit";
import { RedisStore } from "rate-limit-redis";
import { getRedis } from "../config/cache.js";
import { env } from "../config/env.js";
import { ERROR_CODES } from "../constants/error-codes.js";
import { fail } from "../utils/response.js";

// Builds one limiter. "name" keeps the counters of different limiters apart.
function buildLimiter(name, { windowMs, max }) {
  return rateLimit({
    windowMs,
    limit: max,
    standardHeaders: "draft-7",
    legacyHeaders: false,
    passOnStoreError: true,
    store: env.redisUrl
      ? new RedisStore({
          prefix: `rl:${name}:`,
          sendCommand: (...args) => getRedis().call(...args),
        })
      : undefined,
    handler: (req, res) => {
      res
        .status(429)
        .json(
          fail(
            ERROR_CODES.RATE_LIMITED,
            "Too many requests. Please wait a moment and try again.",
            req.id,
          ),
        );
    },
  });
}

// Every API request: the limit is generous, it only stops floods.
export const globalLimiter = buildLimiter("global", {
  windowMs: 60 * 1000,
  max: env.rateLimitPerMinute,
});

// The contact form: strict, because every message is stored and read by a person.
export const contactLimiter = buildLimiter("contact", {
  windowMs: 60 * 60 * 1000,
  max: env.contactRateLimitPerHour,
});
