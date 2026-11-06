/**
 * QueryBoundary.jsx
 * What:  Shows the right thing for a data request: loading skeleton, error with retry,
 *        empty message, or the real content. Keeps every list handling these four states.
 * Used by: all feature sections that load data
 * Talks to: ErrorState
 */
import ErrorState from './ErrorState.jsx';

// "query" is the result of a data hook. "children" is a function that receives the data.
// "isEmpty" (optional) says when the data counts as empty, and "empty" is shown then.
export default function QueryBoundary({ query, skeleton, isEmpty, empty, children }) {
  if (query.isPending) return skeleton;
  if (query.isError) return <ErrorState error={query.error} onRetry={() => query.refetch()} />;
  if (isEmpty?.(query.data)) return empty;
  return children(query.data);
}
