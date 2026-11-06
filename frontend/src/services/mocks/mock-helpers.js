/**
 * mock-helpers.js
 * What:  Makes placeholder lists behave like the future API (same page shape, same filter rule).
 * Used by: the *.service.js files, only in placeholder mode
 * Talks to: constants/pagination.js, constants/categories.js
 */
import { ALL_CATEGORY } from '@/constants/categories.js';
import { DEFAULT_PAGE_LIMIT } from '@/constants/pagination.js';

// Cuts a list into one page and returns it in the API's list shape.
export function paginateMock(items, { page = 1, limit = DEFAULT_PAGE_LIMIT } = {}) {
  const start = (page - 1) * limit;
  return { items: items.slice(start, start + limit), page, limit, total: items.length };
}

// Keeps only items of one category. No category (or "all") keeps everything.
export function filterMockByCategory(items, category) {
  if (!category || category === ALL_CATEGORY) return items;
  return items.filter((item) => item.category === category);
}
