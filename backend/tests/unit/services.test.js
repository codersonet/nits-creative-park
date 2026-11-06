/**
 * services.test.js
 * What:  Checks the cache (hit, miss, broken Redis, simultaneous requests), the fest status rule,
 *        the contact trap field, the pagination SQL and the migration file listing.
 * Used by: npm test
 * Talks to: services/*.js, repositories/base.repository.js, migrations/migrate.js
 */
import { describe, expect, it, vi } from 'vitest';
import { listMigrations } from '../../migrations/migrate.js';
import { purgeOldContactMessages } from '../../src/jobs/purgeContactMessages.job.js';
import { findPage } from '../../src/repositories/base.repository.js';
import { createCache } from '../../src/services/cache.service.js';
import { submitContactMessage } from '../../src/services/contact.service.js';
import { computeFestStatus, withFestStatus } from '../../src/services/fest.service.js';

const silent = { warn: () => {} };

// Builds a cache around a fake Redis that keeps values in a Map.
function makeCache(overrides = {}) {
  const store = new Map();
  const redis = {
    get: vi.fn(async (key) => store.get(key) ?? null),
    set: vi.fn(async (key, value) => store.set(key, value)),
    ...overrides,
  };
  const cache = createCache({ getClient: () => redis, isReady: () => true, ttlSeconds: 300, log: silent });
  return { cache, redis, store };
}

describe('cache', () => {
  it('loads once, stores the answer with a lifetime near the setting, then serves it from the cache', async () => {
    const { cache, redis } = makeCache();
    const loader = vi.fn(async () => ({ a: 1 }));
    expect(await cache.cached('projects', { page: 1 }, loader)).toEqual({ a: 1 });
    expect(await cache.cached('projects', { page: 1 }, loader)).toEqual({ a: 1 });
    expect(loader).toHaveBeenCalledTimes(1);
    const [key, , mode, seconds] = redis.set.mock.calls[0];
    expect(key).toBe('v1:projects:{"page":1}');
    expect(mode).toBe('EX');
    expect(seconds).toBeGreaterThanOrEqual(270);
    expect(seconds).toBeLessThanOrEqual(330);
  });

  it('can cache an answer that is null', async () => {
    const { cache } = makeCache();
    const loader = vi.fn(async () => null);
    await cache.cached('featured', {}, loader);
    expect(await cache.cached('featured', {}, loader)).toBeNull();
    expect(loader).toHaveBeenCalledTimes(1);
  });

  it('still answers from the database when Redis breaks', async () => {
    const { cache } = makeCache({ get: vi.fn(async () => { throw new Error('down'); }) });
    expect(await cache.cached('x', {}, async () => 'fresh')).toBe('fresh');
  });

  it('skips the cache completely when Redis is not ready', async () => {
    const redis = { get: vi.fn(), set: vi.fn() };
    const cache = createCache({ getClient: () => redis, isReady: () => false, ttlSeconds: 300, log: silent });
    expect(await cache.cached('x', {}, async () => 'fresh')).toBe('fresh');
    expect(redis.get).not.toHaveBeenCalled();
    expect(redis.set).not.toHaveBeenCalled();
  });

  it('shares one load between simultaneous identical requests', async () => {
    const { cache } = makeCache();
    let release;
    const loader = vi.fn(() => new Promise((resolve) => { release = () => resolve('done'); }));
    const first = cache.cached('x', {}, loader);
    const second = cache.cached('x', {}, loader);
    await Promise.resolve();
    release();
    expect(await Promise.all([first, second])).toEqual(['done', 'done']);
    expect(loader).toHaveBeenCalledTimes(1);
  });

  it('builds list pages', async () => {
    const { cache } = makeCache();
    const page = await cache.cachedPage('p', { page: 2, limit: 3 }, async () => ({ items: ['a'], total: 4 }));
    expect(page).toEqual({ items: ['a'], page: 2, limit: 3, total: 4 });
  });

  it('clears only keys with the cache prefix', async () => {
    const deleted = [];
    const redis = {
      scanStream: () => (async function* () { yield ['v1:a', 'v1:b']; })(),
      del: vi.fn(async (...keys) => { deleted.push(...keys); return keys.length; }),
    };
    const cache = createCache({ getClient: () => redis, isReady: () => true, ttlSeconds: 1, log: silent });
    expect(await cache.clear()).toBe(2);
    expect(deleted).toEqual(['v1:a', 'v1:b']);
  });
});

describe('fest status', () => {
  it('is UPCOMING before, LIVE during and ENDED after', () => {
    const at = (day) => new Date(`${day}T12:00:00Z`);
    expect(computeFestStatus('2026-10-30', '2026-11-01', at('2026-10-24'))).toBe('UPCOMING');
    expect(computeFestStatus('2026-10-30', '2026-11-01', at('2026-10-30'))).toBe('LIVE');
    expect(computeFestStatus('2026-10-30', '2026-11-01', at('2026-11-01'))).toBe('LIVE');
    expect(computeFestStatus('2026-10-30', '2026-11-01', at('2026-11-02'))).toBe('ENDED');
  });

  it('treats a one-day fest (no end date) correctly and adds the status to a fest', () => {
    expect(computeFestStatus('2026-10-30', null, new Date('2026-10-30T08:00:00Z'))).toBe('LIVE');
    expect(withFestStatus({ id: 'f', startDate: '2026-10-30', endDate: null }, new Date('2026-10-01T00:00:00Z')).status).toBe('UPCOMING');
    expect(withFestStatus(null)).toBeNull();
  });
});

describe('contact service', () => {
  it('drops bot messages without saving', async () => {
    const repository = { insertMessage: vi.fn() };
    await submitContactMessage({ data: null, isBot: true }, repository);
    expect(repository.insertMessage).not.toHaveBeenCalled();
  });

  it('saves real messages', async () => {
    const repository = { insertMessage: vi.fn(async () => 'id-1') };
    const data = { name: 'A', email: 'a@b.co', skills: [], subject: 'S', message: 'M' };
    await submitContactMessage({ data, isBot: false }, repository);
    expect(repository.insertMessage).toHaveBeenCalledWith(data);
  });
});

describe('findPage SQL', () => {
  it('puts every visitor value in parameters, never in the SQL text', async () => {
    const calls = [];
    const run = async (sql, params) => {
      calls.push({ sql, params });
      return sql.startsWith('SELECT COUNT') ? { rows: [{ total: 3 }] } : { rows: [{ id: 'a' }] };
    };
    const result = await findPage(
      { table: 'projects', select: 'id', orderBy: 'id', where: 'category = $1', params: ["x' OR 1=1"], page: 2, limit: 5 },
      run,
    );
    expect(result).toEqual({ items: [{ id: 'a' }], total: 3 });
    expect(calls[0].sql).toBe('SELECT id FROM projects WHERE category = $1 ORDER BY id LIMIT $2 OFFSET $3');
    expect(calls[0].params).toEqual(["x' OR 1=1", 5, 5]);
    expect(calls[0].sql).not.toMatch(/OR 1=1/);
    expect(calls[1].sql).toBe('SELECT COUNT(*)::int AS total FROM projects WHERE category = $1');
  });

  it('works without a filter', async () => {
    const calls = [];
    await findPage({ table: 't', select: 'id', orderBy: 'id', page: 1, limit: 10 }, async (sql, params) => {
      calls.push({ sql, params });
      return { rows: [{ total: 0 }] };
    });
    expect(calls[0].sql).toBe('SELECT id FROM t  ORDER BY id LIMIT $1 OFFSET $2');
    expect(calls[0].params).toEqual([10, 0]);
  });
});

describe('migration files', () => {
  it('lists only well-named up files, in order', () => {
    expect(
      listMigrations(['002_b.up.sql', '001_a.up.sql', '001_a.down.sql', 'notes.md', '3_bad.up.sql', 'migrate.js']),
    ).toEqual(['001_a', '002_b']);
  });
});

describe('retention job', () => {
  it('deletes messages older than the given number of days and reports how many', async () => {
    const repository = { deleteOlderThan: vi.fn(async () => 3) };
    expect(await purgeOldContactMessages(30, repository)).toBe(3);
    expect(repository.deleteOlderThan).toHaveBeenCalledWith(30);
  });
});
