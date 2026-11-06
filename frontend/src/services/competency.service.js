/**
 * competency.service.js
 * What:  Fetches the skill-strength cards for the events page (GET /competencies).
 * Used by: hooks/useCompetencies.js
 * Talks to: apiClient.js, or mocks/competencies.mock.js while VITE_USE_MOCK_DATA=true
 */
import { USE_MOCK_DATA } from '@/constants/env.js';
import { DEFAULT_PAGE_LIMIT } from '@/constants/pagination.js';
import { apiGet } from './apiClient.js';

// Gets one page of competencies. Returns { items, page, limit, total }.
export async function getCompetencies({ page = 1, limit = DEFAULT_PAGE_LIMIT, signal } = {}) {
  if (USE_MOCK_DATA) {
    const [{ competenciesMock }, { paginateMock }] = await Promise.all([
      import('./mocks/competencies.mock.js'),
      import('./mocks/mock-helpers.js'),
    ]);
    return paginateMock(competenciesMock, { page, limit });
  }
  return apiGet('/competencies', { params: { page, limit }, signal });
}
