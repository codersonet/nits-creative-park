/**
 * response.js
 * What:  Builds the standard answer shape: { success, data, error, requestId } (mandate Section 4).
 * Used by: controllers, middleware
 * Talks to: nothing
 */

// A success answer. "data" can be an object, a list page, or null.
export function ok(data, requestId) {
  return { success: true, data, error: null, requestId };
}

// A failure answer. "details" (optional) lists field problems and is only sent for bad input.
export function fail(code, message, requestId, details = null) {
  return {
    success: false,
    data: null,
    error: details ? { code, message, details } : { code, message },
    requestId,
  };
}
