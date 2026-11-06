/**
 * event.service.js
 * What:  Fetches scheduled events (GET /events).
 * Used by: hooks/useEvents.js
 * Talks to: apiClient.js, or mocks/events.mock.js while VITE_USE_MOCK_DATA=true
 */
import { ALL_CATEGORY } from '@/constants/categories.js';
import { USE_MOCK_DATA } from '@/constants/env.js';
import { DEFAULT_PAGE_LIMIT } from '@/constants/pagination.js';
import { apiGet } from './apiClient.js';

// Gets one page of events, for one category or for all of them.
// Returns { items, page, limit, total }.
export async function getEvents({
  category = ALL_CATEGORY,
  page = 1,
  limit = DEFAULT_PAGE_LIMIT,
  signal,
} = {}) {
  if (USE_MOCK_DATA) {
    const [{ eventsMock }, { filterMockByCategory, paginateMock }] = await Promise.all([
      import('./mocks/events.mock.js'),
      import('./mocks/mock-helpers.js'),
    ]);
    return paginateMock(filterMockByCategory(eventsMock, category), { page, limit });
  }
  const categoryParam = category === ALL_CATEGORY ? undefined : category;
  return apiGet('/events', { params: { category: categoryParam, page, limit }, signal });
}
