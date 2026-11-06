/**
 * error.middleware.js
 * What:  Turns every failure into the standard JSON answer. Visitors only ever see a safe
 *        message and a request ID; the real error, with its stack, goes to the log only
 *        (mandate Section 4 and Section 9).
 * Used by: app.js (last in the chain)
 * Talks to: errors/AppError.js, utils/response.js, logger/logger.js, constants/error-codes.js
 */
import { ERROR_CODES } from "../constants/error-codes.js";
import { AppError } from "../errors/AppError.js";
import { logger } from "../logger/logger.js";
import { fail } from "../utils/response.js";

// Maps any thrown value to { status, code, message, details }.
export function describeError(error) {
  if (error instanceof AppError) {
    return {
      status: error.status,
      code: error.code,
      message: error.message,
      details: error.details,
    };
  }
  // Errors raised by the JSON body reader (express.json).
  if (error?.type === "entity.too.large") {
    return {
      status: 413,
      code: ERROR_CODES.PAYLOAD_TOO_LARGE,
      message: "The message is too large.",
      details: null,
    };
  }
  if (error?.type === "entity.parse.failed") {
    return {
      status: 400,
      code: ERROR_CODES.BAD_REQUEST,
      message: "The request body is not valid JSON.",
      details: null,
    };
  }
  return {
    status: 500,
    code: ERROR_CODES.INTERNAL_ERROR,
    message: "Something went wrong on our side. Please try again later.",
    details: null,
  };
}

// For addresses that do not exist.
export function notFoundHandler(req, res) {
  res
    .status(404)
    .json(
      fail(
        ERROR_CODES.NOT_FOUND,
        "We could not find what you asked for.",
        req.id,
      ),
    );
}

// Express recognises an error handler by its four parameters, so all four must stay.
// eslint-disable-next-line no-unused-vars
export function errorHandler(error, req, res, next) {
  const described = describeError(error);
  const log = req.log ?? logger;
  if (described.status >= 500) log.error({ err: error }, "Request failed");
  res
    .status(described.status)
    .json(fail(described.code, described.message, req.id, described.details));
}
