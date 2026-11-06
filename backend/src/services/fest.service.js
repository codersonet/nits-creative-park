/**
 * fest.service.js
 * What:  Business logic for the fests. The spotlight fest's status (UPCOMING, LIVE, ENDED) is
 *        worked out from today's date on every request, so it never goes stale in the cache.
 * Used by: controllers/content.controller.js
 * Talks to: cache.service.js, repositories/fest.repository.js
 */
import * as festRepository from '../repositories/fest.repository.js';
import { cached, cachedPage } from './cache.service.js';

// Works out the status from ISO dates ("2026-10-30"). ISO dates compare correctly as text.
// "today" is in UTC, so the status can be off by a few hours around midnight in India.
export function computeFestStatus(startDate, endDate, today = new Date()) {
  const todayText = today.toISOString().slice(0, 10);
  const lastDay = endDate ?? startDate;
  if (todayText < startDate) return 'UPCOMING';
  if (todayText <= lastDay) return 'LIVE';
  return 'ENDED';
}

// Adds the computed status to a fest row. Returns null when there is no fest.
export function withFestStatus(fest, today = new Date()) {
  if (!fest) return null;
  return { ...fest, status: computeFestStatus(fest.startDate, fest.endDate, today) };
}

// Returns one page of annual fests.
export function listFests(query) {
  return cachedPage('fests', query, () => festRepository.findFests(query));
}

// Returns the spotlight fest with its status, or null when none is promoted.
export async function getFeaturedFest(today = new Date()) {
  const fest = await cached('featured-fest', {}, () => festRepository.findFeatured());
  return withFestStatus(fest, today);
}
