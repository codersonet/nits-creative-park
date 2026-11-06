/**
 * cacheControl.middleware.js
 * What:  Tells browsers and proxies how long an answer may be reused.
 * Used by: routes/*.routes.js
 * Talks to: nothing
 */

// Public read data: reuse for a minute, and serve a slightly old copy while refreshing.
export function publicCache(req, res, next) {
  res.setHeader('Cache-Control', 'public, max-age=60, stale-while-revalidate=300');
  next();
}

// Health checks and form submissions must never be reused.
export function noStore(req, res, next) {
  res.setHeader('Cache-Control', 'no-store');
  next();
}
