/**
 * event.service.js
 * What:  Business logic for scheduled events: reads through the cache, falls back to the repository.
 * Used by: controllers/content.controller.js
 * Talks to: cache.service.js, repositories/event.repository.js
 */
import * as eventRepository from '../repositories/event.repository.js';
import { cachedPage } from './cache.service.js';

// Returns one page: { items, page, limit, total }. "query" is the already-checked page request.
export function listEvents(query) {
  return cachedPage('events', query, () => eventRepository.findEvents(query));
}
