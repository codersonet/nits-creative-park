/**
 * useFests.js
 * What:  Loads the four annual fests (list is in data.items).
 * Used by: EventsPage
 * Talks to: fest.service.js, @tanstack/react-query
 */
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/query-keys.js';
import { getFests } from '@/services/fest.service.js';

// Returns the query result (data, isPending, isError, error, refetch).
export function useFests() {
  return useQuery({
    queryKey: [QUERY_KEYS.fests],
    queryFn: ({ signal }) => getFests({ signal }),
  });
}
