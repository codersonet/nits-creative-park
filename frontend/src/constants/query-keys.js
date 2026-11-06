/**
 * query-keys.js
 * What:  The cache names used by the data hooks. One name per kind of data.
 * Used by: hooks/use*.js
 * Talks to: nothing
 */

// WHY: keeping the names here stops two hooks from accidentally sharing (or missing) a cache entry.
export const QUERY_KEYS = Object.freeze({
  projects: "projects",
  alumni: "alumni",
  companies: "companies",
  placementStats: "placement-stats",
  events: "events",
  fests: "fests",
  featuredFest: "featured-fest",
  competencies: "competencies",
  overviewStats: "overview-stats",
  campusMetrics: "campus-metrics",
});
