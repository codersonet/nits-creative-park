/**
 * async-handler.js
 * What:  Lets a controller be an async function. A thrown error goes to the error middleware
 *        instead of being lost (Express 4 does not do this by itself).
 * Used by: controllers
 * Talks to: nothing
 */

// asyncHandler(async (req, res) => {...}) returns a normal Express handler.
export function asyncHandler(handler) {
  return (req, res, next) => {
    Promise.resolve(handler(req, res, next)).catch(next);
  };
}
