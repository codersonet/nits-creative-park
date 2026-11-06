/**
 * cache.service.js
 * What:  Cache-aside for read answers (mandate Section 7): look in Redis first, otherwise load
 *        from the database and remember the answer for a few minutes. If Redis is missing or
 *        down, it silently skips the cache and the request still works.
 * Used by: every read service
 * Talks to: config/cache.js, config/env.js, logger/logger.js, utils/cache-key.js, utils/pagination.js
 */
import { getRedis, isCacheReady } from '../config/cache.js';
import { env } from '../config/env.js';
import { CACHE_PREFIX } from '../constants/cache.js';
import { logger } from '../logger/logger.js';
import { cacheKey } from '../utils/cache-key.js';
import { toPage } from '../utils/pagination.js';

// Adds up to 10% random time to the lifetime, so many entries do not all expire together.
function lifetimeWithJitter(seconds) {
  return Math.max(1, Math.round(seconds * (0.9 + Math.random() * 0.2)));
}

// Builds a cache from its parts, so tests can hand it a fake Redis.
// getClient() returns the Redis client (or null), isReady() says whether it can answer.
export function createCache({ getClient, isReady, ttlSeconds, log }) {
  // WHY: if 50 visitors ask the same thing at the same moment, only the first one loads it.
  const loadsInProgress = new Map();

  // Shares one running load between identical simultaneous requests (stops a "stampede").
  function loadOnce(key, loader) {
    if (loadsInProgress.has(key)) return loadsInProgress.get(key);
    const promise = loader().finally(() => loadsInProgress.delete(key));
    loadsInProgress.set(key, promise);
    return promise;
  }

  // Returns the cached answer for (resource, params), or runs "loader" and caches its result.
  async function cached(resource, params, loader) {
    const key = cacheKey(CACHE_PREFIX, resource, params);
    const redis = isReady() ? getClient() : null;

    if (redis) {
      try {
        const hit = await redis.get(key);
        if (hit !== null) return JSON.parse(hit);
      } catch (error) {
        log.warn({ err: error, key }, 'Cache read failed, using the database');
      }
    }

    const value = await loadOnce(key, loader);

    if (redis) {
      redis
        .set(key, JSON.stringify(value), 'EX', lifetimeWithJitter(ttlSeconds))
        .catch((error) => log.warn({ err: error, key }, 'Cache write failed'));
    }
    return value;
  }

  // Same as cached(), for list endpoints: the loader returns { items, total }, the answer is a page.
  function cachedPage(resource, query, loader) {
    return cached(resource, query, async () => {
      const { items, total } = await loader();
      return toPage(items, total, query.page, query.limit);
    });
  }

  // Forgets every cached answer with the current prefix. Call it after changing content in the
  // database by hand, so visitors see the change now. Returns how many entries were removed.
  async function clear() {
    const redis = isReady() ? getClient() : null;
    if (!redis) return 0;
    let removed = 0;
    for await (const keys of redis.scanStream({ match: `${CACHE_PREFIX}:*`, count: 100 })) {
      if (keys.length > 0) removed += await redis.del(...keys);
    }
    return removed;
  }

  return { cached, cachedPage, clear };
}

const defaultCache = createCache({
  getClient: getRedis,
  isReady: isCacheReady,
  ttlSeconds: env.cacheTtlSeconds,
  log: logger,
});

export const { cached, cachedPage } = defaultCache;
export const clearContentCache = defaultCache.clear;
