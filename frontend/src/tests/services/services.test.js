/**
 * services.test.js
 * What:  Checks that placeholder mode returns the same list shape the real API will,
 *        and that the contact form fails honestly instead of pretending to send.
 * Used by: npm test
 * Talks to: services/project.service.js, event.service.js, contact.service.js
 */
import { describe, expect, it } from 'vitest';
import { sendContactMessage } from '@/services/contact.service.js';
import { getEvents } from '@/services/event.service.js';
import { getProjects } from '@/services/project.service.js';

describe('services in placeholder mode', () => {
  it('returns the standard list shape', async () => {
    const page = await getProjects();
    expect(page).toMatchObject({ page: 1, limit: 50 });
    expect(page.total).toBe(page.items.length);
  });

  it('filters by category and ignores "all"', async () => {
    const robotics = await getProjects({ category: 'robotics' });
    expect(robotics.items.length).toBeGreaterThan(0);
    expect(robotics.items.every((project) => project.category === 'robotics')).toBe(true);
    expect((await getEvents({ category: 'all' })).total).toBe((await getEvents()).total);
  });

  it('cuts pages by limit', async () => {
    const page = await getProjects({ page: 2, limit: 4 });
    expect(page.items.length).toBe(2);
    expect(page.total).toBe(6);
  });

  it('refuses to pretend a contact message was sent', async () => {
    await expect(sendContactMessage({ name: 'A' })).rejects.toMatchObject({
      code: 'CONTACT_NOT_AVAILABLE',
    });
  });
});
