/**
 * api-error.test.js
 * What:  Checks which failures are worth retrying.
 * Used by: npm test
 * Talks to: utils/api-error.js
 */
import { describe, expect, it } from 'vitest';
import { ApiError, isRetryable } from '@/utils/api-error.js';

const make = (code, status = 0) => new ApiError({ code, message: 'x', status });

describe('isRetryable', () => {
  it('retries connection problems, timeouts and server errors', () => {
    expect(isRetryable(make('NETWORK_ERROR'))).toBe(true);
    expect(isRetryable(make('TIMEOUT'))).toBe(true);
    expect(isRetryable(make('BAD_RESPONSE', 502))).toBe(true);
  });

  it('does not retry errors that would fail again', () => {
    expect(isRetryable(make('NOT_FOUND', 404))).toBe(false);
    expect(isRetryable(new Error('plain'))).toBe(false);
  });
});
