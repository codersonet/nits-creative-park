/**
 * ErrorState.jsx
 * What:  The message shown when something fails to load, with an optional "try again" button.
 * Used by: pages (data errors), ErrorBoundary (crashes)
 * Talks to: Button, GlassCard, utils/api-error.js
 */
import { ApiError } from '@/utils/api-error.js';
import Button from './Button.jsx';
import GlassCard from './GlassCard.jsx';

const FALLBACK_MESSAGE = 'Something went wrong. Please try again.';

// SECURITY: only an ApiError message is shown, because the server wrote it to be safe for people.
// Any other error text could contain internal details, so it is replaced by the fallback.
export default function ErrorState({ title = 'Could not load this', error, onRetry }) {
  const isApiError = error instanceof ApiError;
  return (
    <GlassCard className="state-card" role="alert">
      <h2 className="headline-lg">{title}</h2>
      <p className="body-md">{isApiError ? error.message : FALLBACK_MESSAGE}</p>
      {isApiError && error.requestId && (
        <span className="label-mono text-muted">REF: {error.requestId}</span>
      )}
      {onRetry && (
        <Button variant="ghost" onClick={onRetry}>
          TRY_AGAIN
        </Button>
      )}
    </GlassCard>
  );
}
