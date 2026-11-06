/**
 * utils.test.js
 * What:  Checks the tiny helpers: pagination, cache keys and the answer shapes.
 * Used by: npm test
 * Talks to: utils/pagination.js, utils/cache-key.js, utils/response.js
 */
import { describe, expect, it } from 'vitest';
import { cacheKey } from '../../src/utils/cache-key.js';
import { toOffset, toPage } from '../../src/utils/pagination.js';
import { fail, ok } from '../../src/utils/response.js';

describe('pagination', () => {
  it('computes offsets', () => {
    expect(toOffset(1, 50)).toBe(0);
    expect(toOffset(3, 10)).toBe(20);
  });

  it('wraps items in the list shape', () => {
    expect(toPage(['a'], 9, 2, 4)).toEqual({ items: ['a'], page: 2, limit: 4, total: 9 });
  });
});

describe('cacheKey', () => {
  it('is the same whatever the order of the parameters', () => {
    expect(cacheKey('v1', 'projects', { page: 1, category: 'tech' })).toBe(
      cacheKey('v1', 'projects', { category: 'tech', page: 1 }),
    );
  });

  it('ignores undefined values and separates different questions', () => {
    expect(cacheKey('v1', 'p', { category: undefined, page: 1 })).toBe('v1:p:{"page":1}');
    expect(cacheKey('v1', 'p', { page: 1 })).not.toBe(cacheKey('v1', 'p', { page: 2 }));
  });
});

describe('answer shapes', () => {
  it('builds a success answer', () => {
    expect(ok({ a: 1 }, 'r1')).toEqual({ success: true, data: { a: 1 }, error: null, requestId: 'r1' });
  });

  it('builds a failure answer, with details only when given', () => {
    expect(fail('X', 'msg', 'r1').error).toEqual({ code: 'X', message: 'msg' });
    expect(fail('X', 'msg', 'r1', [{ field: 'a' }]).error.details).toEqual([{ field: 'a' }]);
  });
});
