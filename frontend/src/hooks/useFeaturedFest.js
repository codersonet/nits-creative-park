/**
 * useFeaturedFest.js
 * What:  Loads the spotlight fest. Data can be null when none is promoted.
 * Used by: EventsPage
 * Talks to: fest.service.js, @tanstack/react-query
 */
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/query-keys.js';
import { getFeaturedFest } from '@/services/fest.service.js';

// Returns the query result (data, isPending, isError, error, refetch).
export function useFeaturedFest() {
  return useQuery({
    queryKey: [QUERY_KEYS.featuredFest],
    queryFn: ({ signal }) => getFeaturedFest({ signal }),
  });
}
