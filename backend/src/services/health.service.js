/**
 * health.service.js
 * What:  Works out whether the API is ready to serve traffic: the database is required,
 *        the cache is optional (the API still works without it, just slower).
 * Used by: controllers/health.controller.js
 * Talks to: repositories/health.repository.js, config/cache.js, config/env.js
 */
import { isCacheReady } from "../config/cache.js";
import { env } from "../config/env.js";
import { pingDatabase } from "../repositories/health.repository.js";

// Returns { ready, database, cache }. "cache" is "disabled" when no Redis is configured.
export async function checkReadiness() {
  const database = await pingDatabase().then(
    () => "up",
    () => "down",
  );
  let cache = "disabled";
  if (env.redisUrl) cache = isCacheReady() ? "up" : "down";
  return { ready: database === "up", database, cache };
}
