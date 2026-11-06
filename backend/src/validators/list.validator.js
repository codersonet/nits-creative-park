/**
 * list.validator.js
 * What:  Checks the page, limit and category of list requests. Unknown parameters are rejected,
 *        which also stops visitors from filling the cache with made-up keys.
 * Used by: routes/content.routes.js (through middleware/validate.middleware.js)
 * Talks to: utils/validation.js, errors/AppError.js, constants/*
 */
import { EVENT_CATEGORIES, PROJECT_CATEGORIES } from '../constants/categories.js';
import { DEFAULT_LIMIT, MAX_LIMIT, MAX_PAGE } from '../constants/pagination.js';
import { ValidationError } from '../errors/AppError.js';
import { readChoice, readInteger } from '../utils/validation.js';

// Builds a validator. Give a list of categories to allow "?category=", or nothing for no filter.
function buildListQueryValidator(categories = null) {
  const allowedNames = categories ? ['page', 'limit', 'category'] : ['page', 'limit'];

  // Returns { page, limit, category } or throws a ValidationError listing every problem.
  return function validateListQuery(query = {}) {
    const errors = [];
    Object.keys(query).forEach((name) => {
      if (!allowedNames.includes(name)) errors.push({ field: name, message: 'Unknown parameter.' });
    });
    const page = readInteger(errors, 'page', query.page, { min: 1, max: MAX_PAGE, fallback: 1 });
    const limit = readInteger(errors, 'limit', query.limit, {
      min: 1,
      max: MAX_LIMIT,
      fallback: DEFAULT_LIMIT,
    });
    const category = categories ? readChoice(errors, 'category', query.category, categories) : undefined;
    if (errors.length > 0) throw new ValidationError(errors);
    return { page, limit, category };
  };
}

export const pageQuery = buildListQueryValidator();
export const projectQuery = buildListQueryValidator(PROJECT_CATEGORIES);
export const eventQuery = buildListQueryValidator(EVENT_CATEGORIES);
