/**
 * useCompetencies.js
 * What:  Loads the skill-strength cards (list is in data.items).
 * Used by: EventsPage
 * Talks to: competency.service.js, @tanstack/react-query
 */
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/query-keys.js';
import { getCompetencies } from '@/services/competency.service.js';

// Returns the query result (data, isPending, isError, error, refetch).
export function useCompetencies() {
  return useQuery({
    queryKey: [QUERY_KEYS.competencies],
    queryFn: ({ signal }) => getCompetencies({ signal }),
  });
}
