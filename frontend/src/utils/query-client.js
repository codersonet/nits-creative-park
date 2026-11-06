/**
 * query-client.js
 * What:  The shared data cache and its default rules (mandate Section 8.2).
 * Used by: main.jsx (provider)
 * Talks to: @tanstack/react-query, api-error.js
 */
import { QueryClient } from '@tanstack/react-query';
import { isRetryable } from './api-error.js';

const FIVE_MINUTES = 5 * 60 * 1000;
const THIRTY_MINUTES = 30 * 60 * 1000;

// Retry only failures that can fix themselves, and at most twice.
function shouldRetry(failureCount, error) {
  return isRetryable(error) && failureCount < 2;
}

export const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      // PERF: show cached data instantly, refresh it quietly in the background (stale-while-revalidate).
      staleTime: FIVE_MINUTES,
      gcTime: THIRTY_MINUTES,
      retry: shouldRetry,
      // WHY: this content changes rarely, so refetching on every tab focus would waste requests.
      refetchOnWindowFocus: false,
    },
  },
});
