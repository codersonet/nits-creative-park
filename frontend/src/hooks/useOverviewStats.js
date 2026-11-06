/**
 * useOverviewStats.js
 * What:  Loads the four homepage counters (list is in data.stats).
 * Used by: HomePage
 * Talks to: metrics.service.js, @tanstack/react-query
 */
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/query-keys.js';
import { getOverviewStats } from '@/services/metrics.service.js';

// Returns the query result (data, isPending, isError, error, refetch).
export function useOverviewStats() {
  return useQuery({
    queryKey: [QUERY_KEYS.overviewStats],
    queryFn: ({ signal }) => getOverviewStats({ signal }),
  });
}
