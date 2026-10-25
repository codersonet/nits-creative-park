/**
 * usePlacementStats.js
 * What:  Loads the headline placement figures.
 * Used by: CompaniesPage
 * Talks to: placement.service.js, @tanstack/react-query
 */
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/query-keys.js';
import { getPlacementStats } from '@/services/placement.service.js';

// Returns the query result (data, isPending, isError, error, refetch).
export function usePlacementStats() {
  return useQuery({
    queryKey: [QUERY_KEYS.placementStats],
    queryFn: ({ signal }) => getPlacementStats({ signal }),
  });
}
