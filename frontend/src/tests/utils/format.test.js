/**
 * format.test.js
 * What:  Checks the small text formatters.
 * Used by: npm test
 * Talks to: utils/format.js
 */
import { describe, expect, it } from 'vitest';
import { formatClassLabel, formatCount, formatLpa } from '@/utils/format.js';

describe('formatters', () => {
  it('builds the class label', () => {
    expect(formatClassLabel(2021)).toBe("CLASS OF '21'");
  });

  it('shows packages with two decimals', () => {
    expect(formatLpa(33.46)).toBe('₹ 33.46 LPA');
    expect(formatLpa(8.3)).toBe('₹ 8.30 LPA');
  });

  it('adds a thousands separator from 1000 upwards only', () => {
    expect(formatCount(999)).toBe('999');
    expect(formatCount(1659)).toBe('1,659');
  });
});
