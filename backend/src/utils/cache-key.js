/**
 * cache-key.js
 * What:  Builds a cache key that is the same for the same question, whatever the order of the
 *        parameters.
 * Used by: services/cache.service.js
 * Talks to: nothing
 */

// cacheKey('v1', 'projects', { page: 1, category: 'tech' }) -> 'v1:projects:{"category":"tech","page":1}'
export function cacheKey(prefix, resource, params = {}) {
  const sorted = Object.keys(params)
    .filter((name) => params[name] !== undefined)
    .sort()
    .reduce((result, name) => ({ ...result, [name]: params[name] }), {});
  return `${prefix}:${resource}:${JSON.stringify(sorted)}`;
}
