/**
 * cache.js
 * What:  The Redis connection. If REDIS_URL is empty there is no cache and everything still works.
 *        If Redis goes down, commands fail fast instead of queueing, so requests are never stuck.
 * Used by: services/cache.service.js, middleware/rateLimit.middleware.js, services/health.service.js
 * Talks to: ioredis, config/env.js, logger/logger.js
 */
import Redis from "ioredis";
import { logger } from "../logger/logger.js";
import { env } from "./env.js";

let client = null;

// Returns the shared Redis client, creating it on first use. Returns null when caching is off.
export function getRedis() {
  if (!env.redisUrl) return null;
  if (!client) {
    client = new Redis(env.redisUrl, {
      maxRetriesPerRequest: 1,
      enableOfflineQueue: false,
      connectTimeout: 2000,
      retryStrategy: (attempt) => Math.min(attempt * 200, 5000),
    });
    client.on("error", (error) =>
      logger.warn({ err: error }, "Cache connection problem"),
    );
  }
  return client;
}

// True only while Redis is connected and able to answer.
export function isCacheReady() {
  return getRedis()?.status === "ready";
}

// Closes the connection. Used during shutdown.
export async function closeCache() {
  if (!client) return;
  try {
    await client.quit();
  } catch {
    client.disconnect();
  }
}
