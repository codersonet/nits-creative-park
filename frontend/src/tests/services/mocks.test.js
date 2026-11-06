/**
 * mocks.test.js
 * What:  Guards the placeholder data: unique ids, valid categories and sensible dates.
 * Used by: npm test
 * Talks to: services/mocks/*.mock.js, constants/categories.js
 */
import { describe, expect, it } from 'vitest';
import { EVENT_CATEGORIES, PROJECT_CATEGORIES } from '@/constants/categories.js';
import { alumniMock } from '@/services/mocks/alumni.mock.js';
import { companiesMock } from '@/services/mocks/companies.mock.js';
import { competenciesMock } from '@/services/mocks/competencies.mock.js';
import { eventsMock } from '@/services/mocks/events.mock.js';
import { festsMock } from '@/services/mocks/fests.mock.js';
import { projectsMock } from '@/services/mocks/projects.mock.js';

const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;
const lists = {
  projects: projectsMock,
  alumni: alumniMock,
  companies: companiesMock,
  competencies: competenciesMock,
  events: eventsMock,
  fests: festsMock,
};

describe('placeholder data', () => {
  it.each(Object.entries(lists))('%s has unique ids', (name, list) => {
    expect(new Set(list.map((item) => item.id)).size).toBe(list.length);
  });

  it('uses only known categories', () => {
    const projectValues = PROJECT_CATEGORIES.map((category) => category.value);
    const eventValues = EVENT_CATEGORIES.map((category) => category.value);
    expect(projectsMock.every((item) => projectValues.includes(item.category))).toBe(true);
    expect(eventsMock.every((item) => eventValues.includes(item.category))).toBe(true);
    expect(
      festsMock.every((fest) => fest.filterCategory === null || eventValues.includes(fest.filterCategory)),
    ).toBe(true);
  });

  it('has valid event dates with the end on or after the start', () => {
    eventsMock.forEach((event) => {
      expect(event.startDate).toMatch(ISO_DATE);
      if (event.endDate) expect(event.endDate >= event.startDate).toBe(true);
    });
  });

  it('keeps progress values between 0 and 100', () => {
    expect([...projectsMock, ...competenciesMock].every((item) => {
      const value = item.progress ?? item.percent;
      return value >= 0 && value <= 100;
    })).toBe(true);
  });
});
