/**
 * useProjects.js
 * What:  Loads student projects for one category and caches each category separately.
 * Used by: ClubsPage
 * Talks to: project.service.js, @tanstack/react-query
 */
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { ALL_CATEGORY } from '@/constants/categories.js';
import { QUERY_KEYS } from '@/constants/query-keys.js';
import { getProjects } from '@/services/project.service.js';

// Returns the query result; the list is in data.items.
export function useProjects(category = ALL_CATEGORY) {
  return useQuery({
    queryKey: [QUERY_KEYS.projects, category],
    queryFn: ({ signal }) => getProjects({ category, signal }),
    // WHY: keep the old cards on screen while the next category loads, so the grid never jumps.
    placeholderData: keepPreviousData,
  });
}
