/**
 * AppError.js
 * What:  The error types the backend throws on purpose. The error middleware turns each one
 *        into the standard JSON answer. Anything else becomes a generic 500.
 * Used by: validators, services, middleware
 * Talks to: constants/error-codes.js
 */
import { ERROR_CODES } from "../constants/error-codes.js";

// A problem we expected. "message" is written to be safe to show to a visitor.
export class AppError extends Error {
  constructor({ status, code, message, details = null }) {
    super(message);
    this.name = this.constructor.name;
    this.status = status;
    this.code = code;
    this.details = details;
  }
}

// The visitor sent something wrong. "details" is a list of { field, message }.
export class ValidationError extends AppError {
  constructor(details) {
    super({
      status: 400,
      code: ERROR_CODES.VALIDATION_FAILED,
      message: "Please check the highlighted fields and try again.",
      details,
    });
  }
}

// The thing asked for does not exist.
export class NotFoundError extends AppError {
  constructor(message = "We could not find what you asked for.") {
    super({ status: 404, code: ERROR_CODES.NOT_FOUND, message });
  }
}

// A part the API depends on is down, so it cannot serve traffic right now.
export class NotReadyError extends AppError {
  constructor(
    message = "The service is starting up or temporarily unavailable.",
  ) {
    super({ status: 503, code: ERROR_CODES.NOT_READY, message });
  }
}
