/**
 * project.service.js
 * What:  Business logic for student projects: reads through the cache, falls back to the repository.
 * Used by: controllers/content.controller.js
 * Talks to: cache.service.js, repositories/project.repository.js
 */
import * as projectRepository from '../repositories/project.repository.js';
import { cachedPage } from './cache.service.js';

// Returns one page: { items, page, limit, total }. "query" is the already-checked page request.
export function listProjects(query) {
  return cachedPage('projects', query, () => projectRepository.findProjects(query));
}
