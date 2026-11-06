/**
 * alumni.service.js
 * What:  Business logic for the alumni directory: reads through the cache, falls back to the repository.
 * Used by: controllers/content.controller.js
 * Talks to: cache.service.js, repositories/alumni.repository.js
 */
import * as alumniRepository from '../repositories/alumni.repository.js';
import { cachedPage } from './cache.service.js';

// Returns one page: { items, page, limit, total }. "query" is the already-checked page request.
export function listAlumni(query) {
  return cachedPage('alumni', query, () => alumniRepository.findAlumni(query));
}
