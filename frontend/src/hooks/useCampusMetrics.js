/**
 * useCampusMetrics.js
 * What:  Loads everything on the metrics page.
 * Used by: MetricsPage
 * Talks to: metrics.service.js, @tanstack/react-query
 */
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/query-keys.js';
import { getCampusMetrics } from '@/services/metrics.service.js';

// Returns the query result (data, isPending, isError, error, refetch).
export function useCampusMetrics() {
  return useQuery({
    queryKey: [QUERY_KEYS.campusMetrics],
    queryFn: ({ signal }) => getCampusMetrics({ signal }),
  });
}
