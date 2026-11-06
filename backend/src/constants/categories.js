/**
 * categories.js
 * What:  The allowed category values for projects and events.
 * Used by: validators/list.validator.js, models, migrations (same values in CHECK rules)
 * Talks to: nothing
 */
export const PROJECT_CATEGORIES = Object.freeze([
  "tech",
  "robotics",
  "creative",
]);
export const EVENT_CATEGORIES = Object.freeze([
  "tech",
  "hackathon",
  "robotics",
  "culture",
  "sports",
]);
