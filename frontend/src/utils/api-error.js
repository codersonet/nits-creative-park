/**
 * api-error.js
 * What:  One error type for every failed API call, plus a check for "worth retrying".
 * Used by: apiClient.js, contact.service.js, query-client.js, error-state components
 * Talks to: nothing
 */

// Carries a stable "code" (for the code to check) and a "message" (safe to show to people).
// "requestId" lets support find the matching server log line.
export class ApiError extends Error {
  constructor({ code, message, status = 0, requestId = null }) {
    super(message);
    this.name = 'ApiError';
    this.code = code;
    this.status = status;
    this.requestId = requestId;
  }
}

// True when trying again could work: no connection, a timeout, or a server-side failure.
// Errors like "not found" or "invalid input" will fail again, so they are not retried.
export function isRetryable(error) {
  if (!(error instanceof ApiError)) return false;
  return error.code === 'NETWORK_ERROR' || error.code === 'TIMEOUT' || error.status >= 500;
}
