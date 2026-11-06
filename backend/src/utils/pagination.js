/**
 * pagination.js
 * What:  Turns page and limit into a database offset, and wraps results in the list shape.
 * Used by: repositories/base.repository.js, services/cache.service.js
 * Talks to: nothing
 */

// Page 1 starts at 0, page 2 at "limit", and so on.
export function toOffset(page, limit) {
  return (page - 1) * limit;
}

// The list shape every list endpoint returns.
export function toPage(items, total, page, limit) {
  return { items, page, limit, total };
}
