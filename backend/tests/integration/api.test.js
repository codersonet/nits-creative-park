/**
 * api.test.js
 * What:  Tests the whole API against a REAL PostgreSQL database: migrations, seed data, every
 *        endpoint's shape, bad and attack-shaped input, security headers, and contact messages.
 *        Skipped automatically unless TEST_DATABASE_URL is set (CI sets it).
 * Used by: npm run test:integration
 * Talks to: src/app.js, migrations/migrate.js, seeds/seed.js, config/database.js
 */
import request from 'supertest';
import { afterAll, beforeAll, describe, expect, it } from 'vitest';
import { migrate } from '../../migrations/migrate.js';
import { runSeeds } from '../../seeds/seed.js';
import { createApp } from '../../src/app.js';
import { closeDatabase, query } from '../../src/config/database.js';

const API = '/api/v1';
const goodMessage = {
  name: 'Test Visitor',
  email: 'visitor@example.org',
  skills: ['HIMALAYAN_IOT'],
  subject: 'SYSTEM_FEEDBACK',
  message: 'Hello from the integration test',
};

describe.skipIf(!process.env.TEST_DATABASE_URL)('API with a real database', () => {
  const app = createApp();

  beforeAll(async () => {
    await migrate('up');
    await runSeeds();
    await query('DELETE FROM contact_messages');
  });

  afterAll(async () => {
    await closeDatabase();
  });

  describe('health', () => {
    it('answers liveness and readiness', async () => {
      expect((await request(app).get('/health')).status).toBe(200);
      const ready = await request(app).get('/ready');
      expect(ready.status).toBe(200);
      expect(ready.body.data.database).toBe('up');
      expect(ready.headers['cache-control']).toBe('no-store');
    });
  });

  describe('lists', () => {
    it('returns projects in the list shape', async () => {
      const res = await request(app).get(`${API}/projects`);
      expect(res.status).toBe(200);
      expect(res.body).toMatchObject({ success: true, error: null });
      expect(res.body.data).toMatchObject({ page: 1, limit: 50, total: 6 });
      expect(res.body.data.items[0]).toMatchObject({ id: expect.any(String), progress: expect.any(Number) });
      expect(Array.isArray(res.body.data.items[0].stack)).toBe(true);
    });

    it('filters by category and paginates', async () => {
      expect((await request(app).get(`${API}/projects?category=robotics`)).body.data.total).toBe(3);
      const page = await request(app).get(`${API}/projects?page=2&limit=4`);
      expect(page.body.data.items).toHaveLength(2);
      expect(page.body.data.total).toBe(6);
    });

    it('returns events with plain dates and an action object', async () => {
      const { items } = (await request(app).get(`${API}/events`)).body.data;
      expect(items[0].startDate).toMatch(/^\d{4}-\d{2}-\d{2}$/);
      expect(items[0].action).toHaveProperty('label');
      expect(items.some((event) => event.endDate === null)).toBe(true);
    });

    it('returns every other list', async () => {
      const lists = { alumni: 6, companies: 43, fests: 4, competencies: 3 };
      for (const [name, total] of Object.entries(lists)) {
        const res = await request(app).get(`${API}/${name}`);
        expect([name, res.status, res.body.data.total]).toEqual([name, 200, total]);
      }
    });
  });

  describe('single objects', () => {
    it('returns placement figures as numbers', async () => {
      const { data } = (await request(app).get(`${API}/placement-stats`)).body;
      expect(typeof data.highestDomesticPackageLpa).toBe('number');
      expect(data.academicYear).toBe('2025-2026');
    });

    it('returns the featured fest with a computed status', async () => {
      const { data } = (await request(app).get(`${API}/fests/featured`)).body;
      expect(['UPCOMING', 'LIVE', 'ENDED']).toContain(data.status);
      expect(data.image.srcSet).toContain('640w');
      expect(data.primaryAction.url).toMatch(/^https:/);
    });

    it('returns the metrics', async () => {
      const overview = (await request(app).get(`${API}/metrics/overview`)).body.data;
      expect(overview.stats).toHaveLength(4);
      const campus = (await request(app).get(`${API}/metrics/campus`)).body.data;
      expect(campus.stats).toHaveLength(4);
      expect(campus.participation).toHaveLength(6);
      expect(typeof campus.infrastructure.nodeLatencyMs).toBe('number');
    });
  });

  describe('bad and hostile input', () => {
    it('refuses unknown categories, SQL-looking text, big limits and unknown parameters', async () => {
      const bad = [
        '?category=nope',
        `?category=${encodeURIComponent("' OR 1=1 --")}`,
        '?limit=1000',
        '?page=0',
        '?foo=bar',
        '?page=1&page=2',
      ];
      for (const suffix of bad) {
        const res = await request(app).get(`${API}/projects${suffix}`);
        expect([suffix, res.status, res.body.error.code]).toEqual([suffix, 400, 'VALIDATION_FAILED']);
      }
    });

    it('returns the standard 404 for unknown addresses', async () => {
      const res = await request(app).get(`${API}/nothing-here`);
      expect(res.status).toBe(404);
      expect(res.body.error.code).toBe('NOT_FOUND');
    });
  });

  describe('headers', () => {
    it('sends security headers, a request ID and cache rules', async () => {
      const res = await request(app).get(`${API}/alumni`).set('X-Request-Id', 'abc12345-test');
      expect(res.headers['x-powered-by']).toBeUndefined();
      expect(res.headers['x-content-type-options']).toBe('nosniff');
      expect(res.headers['x-request-id']).toBe('abc12345-test');
      expect(res.headers['cache-control']).toMatch(/max-age=60/);
      expect(res.body.requestId).toBe('abc12345-test');
    });
  });

  describe('contact messages', () => {
    it('saves a valid message', async () => {
      const res = await request(app).post(`${API}/contact-messages`).send(goodMessage);
      expect(res.status).toBe(201);
      expect(res.body).toMatchObject({ success: true, data: null });
      const saved = await query("SELECT * FROM contact_messages WHERE email = 'visitor@example.org'");
      expect(saved.rowCount).toBe(1);
      expect(saved.rows[0].skills).toEqual(['HIMALAYAN_IOT']);
    });

    it('pretends success for the trap field but saves nothing', async () => {
      const before = (await query('SELECT COUNT(*)::int AS n FROM contact_messages')).rows[0].n;
      const res = await request(app).post(`${API}/contact-messages`).send({ ...goodMessage, website: 'spam' });
      expect(res.status).toBe(201);
      expect((await query('SELECT COUNT(*)::int AS n FROM contact_messages')).rows[0].n).toBe(before);
    });

    it('rejects bad fields with details and never shows internals', async () => {
      const res = await request(app).post(`${API}/contact-messages`).send({ ...goodMessage, email: 'nope', admin: true });
      expect(res.status).toBe(400);
      expect(res.body.error.details.map((item) => item.field).sort()).toEqual(['admin', 'email']);
      expect(JSON.stringify(res.body)).not.toMatch(/stack| at /);
    });

    it('rejects broken JSON and oversized bodies', async () => {
      const broken = await request(app).post(`${API}/contact-messages`).set('Content-Type', 'application/json').send('{"name":');
      expect(broken.status).toBe(400);
      const big = await request(app).post(`${API}/contact-messages`).send({ ...goodMessage, message: 'x'.repeat(11000) });
      expect(big.status).toBe(413);
    });

    it('rate-limits repeated sending', async () => {
      let last;
      for (let i = 0; i < 6; i += 1) {
        last = await request(app).post(`${API}/contact-messages`).send(goodMessage);
      }
      expect(last.status).toBe(429);
      expect(last.body.error.code).toBe('RATE_LIMITED');
    });
  });
});
