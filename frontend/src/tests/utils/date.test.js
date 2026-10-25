/**
 * date.test.js
 * What:  Checks the date labels shown on event and fest cards.
 * Used by: npm test
 * Talks to: utils/date.js
 */
import { describe, expect, it } from 'vitest';
import { formatDateRange } from '@/utils/date.js';

describe('formatDateRange', () => {
  it('shows one day', () => {
    expect(formatDateRange('2026-10-28')).toBe('OCT 28, 2026');
    expect(formatDateRange('2026-12-05', null)).toBe('DEC 05, 2026');
  });

  it('treats an end date equal to the start date as one day', () => {
    expect(formatDateRange('2026-11-14', '2026-11-14')).toBe('NOV 14, 2026');
  });

  it('shows a range inside one month, across months and across years', () => {
    expect(formatDateRange('2026-11-14', '2026-11-15')).toBe('NOV 14 - 15, 2026');
    expect(formatDateRange('2026-10-30', '2026-11-01')).toBe('OCT 30 - NOV 01, 2026');
    expect(formatDateRange('2026-12-30', '2027-01-02')).toBe('DEC 30, 2026 - JAN 02, 2027');
  });

  it('returns an empty string for missing or invalid dates', () => {
    expect(formatDateRange(undefined)).toBe('');
    expect(formatDateRange('14/11/2026')).toBe('');
  });
});
