/**
 * competency.service.js
 * What:  Business logic for skill-strength cards: reads through the cache, falls back to the repository.
 * Used by: controllers/content.controller.js
 * Talks to: cache.service.js, repositories/competency.repository.js
 */
import * as competencyRepository from "../repositories/competency.repository.js";
import { cachedPage } from "./cache.service.js";

// Returns one page: { items, page, limit, total }. "query" is the already-checked page request.
export function listCompetencies(query) {
  return cachedPage("competencies", query, () =>
    competencyRepository.findCompetencies(query),
  );
}
