/**
 * useCompanies.js
 * What:  Loads the recruitment partners (list is in data.items).
 * Used by: CompaniesPage
 * Talks to: company.service.js, @tanstack/react-query
 */
import { useQuery } from '@tanstack/react-query';
import { QUERY_KEYS } from '@/constants/query-keys.js';
import { getCompanies } from '@/services/company.service.js';

// Returns the query result (data, isPending, isError, error, refetch).
export function useCompanies() {
  return useQuery({
    queryKey: [QUERY_KEYS.companies],
    queryFn: ({ signal }) => getCompanies({ signal }),
  });
}
