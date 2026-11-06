/**
 * metrics.service.js
 * What:  Fetches the homepage counters (GET /metrics/overview)
 *        and the metrics page data (GET /metrics/campus).
 * Used by: hooks/useOverviewStats.js, hooks/useCampusMetrics.js
 * Talks to: apiClient.js, or mocks/metrics.mock.js while VITE_USE_MOCK_DATA=true
 */
import { USE_MOCK_DATA } from '@/constants/env.js';
import { apiGet } from './apiClient.js';

// Gets the four homepage counters. Returns { stats: [...] }.
export async function getOverviewStats({ signal } = {}) {
  if (USE_MOCK_DATA) {
    const { overviewStatsMock } = await import('./mocks/metrics.mock.js');
    return { stats: overviewStatsMock };
  }
  return apiGet('/metrics/overview', { signal });
}

// Gets everything the metrics page shows. Returns { stats, participation, infrastructure }.
export async function getCampusMetrics({ signal } = {}) {
  if (USE_MOCK_DATA) {
    const { campusMetricsMock } = await import('./mocks/metrics.mock.js');
    return campusMetricsMock;
  }
  return apiGet('/metrics/campus', { signal });
}
