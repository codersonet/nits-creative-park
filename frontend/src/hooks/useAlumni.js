/**
 * useAlumni.js
 * What:  Loads the alumni directory (list is in data.items).
 * Used by: AlumniPage
 * Talks to: alumni.service.js, @tanstack/react-query
 */
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/query-keys.js';
import { getAlumni } from '@/services/alumni.service.js';

// Returns the query result (data, isPending, isError, error, refetch).
export function useAlumni() {
  return useQuery({
    queryKey: [QUERY_KEYS.alumni],
    queryFn: ({ signal }) => getAlumni({ signal }),
  });
}
