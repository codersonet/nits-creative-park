/**
 * useEvents.js
 * What:  Loads scheduled events for one category and caches each category separately.
 * Used by: EventsPage
 * Talks to: event.service.js, @tanstack/react-query
 */
import { keepPreviousData, useQuery } from '@tanstack/react-query';
import { ALL_CATEGORY } from '@/constants/categories.js';
import { QUERY_KEYS } from '@/constants/query-keys.js';
import { getEvents } from '@/services/event.service.js';

// Returns the query result; the list is in data.items.
export function useEvents(category = ALL_CATEGORY) {
  return useQuery({
    queryKey: [QUERY_KEYS.events, category],
    queryFn: ({ signal }) => getEvents({ category, signal }),
    // WHY: keep the old cards on screen while the next category loads, so the list never jumps.
    placeholderData: keepPreviousData,
  });
}
