/**
 * error-codes.js
 * What:  The stable error codes the API sends. Clients check the code, people read the message.
 * Used by: errors/AppError.js, middleware, controllers
 * Talks to: nothing
 */
export const ERROR_CODES = Object.freeze({
  VALIDATION_FAILED: "VALIDATION_FAILED",
  BAD_REQUEST: "BAD_REQUEST",
  NOT_FOUND: "NOT_FOUND",
  PAYLOAD_TOO_LARGE: "PAYLOAD_TOO_LARGE",
  RATE_LIMITED: "RATE_LIMITED",
  NOT_READY: "NOT_READY",
  INTERNAL_ERROR: "INTERNAL_ERROR",
});
