/**
 * validate.middleware.js
 * What:  Runs a validator on the query string or the body and puts the clean result on
 *        req.validated. A ValidationError goes to the error middleware.
 * Used by: routes/*.routes.js
 * Talks to: validators/*.validator.js
 */

// validateQuery(projectQuery) -> checks req.query
export function validateQuery(validator) {
  return (req, res, next) => {
    try {
      req.validated = validator(req.query);
      next();
    } catch (error) {
      next(error);
    }
  };
}

// validateBody(validateContactMessage) -> checks req.body
export function validateBody(validator) {
  return (req, res, next) => {
    try {
      req.validated = validator(req.body);
      next();
    } catch (error) {
      next(error);
    }
  };
}
