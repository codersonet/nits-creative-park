/**
 * env.test.js
 * What:  Checks the start-up settings check: defaults, parsing and clear failures.
 * Used by: npm test
 * Talks to: config/env.js
 */
import { describe, expect, it } from 'vitest';
import { readEnv } from '../../src/config/env.js';

const base = { DATABASE_URL: 'postgres://u:p@h:5432/d' };

describe('readEnv', () => {
  it('fills in safe defaults', () => {
    const env = readEnv(base);
    expect(env).toMatchObject({ port: 4000, nodeEnv: 'development', dbSsl: false, redisUrl: null, trustProxy: 1 });
    expect(env.corsOrigins).toEqual([]);
    expect(env.allowSeed).toBe(false);
  });

  it('reads a comma separated list of origins', () => {
    expect(readEnv({ ...base, CORS_ORIGINS: 'https://a.org, https://b.org ,' }).corsOrigins).toEqual([
      'https://a.org',
      'https://b.org',
    ]);
  });

  it('stops with one message that lists every problem', () => {
    expect(() => readEnv({ PORT: 'abc', DB_SSL: 'yes', NODE_ENV: 'staging' })).toThrow(/DATABASE_URL is required/);
    try {
      readEnv({ PORT: 'abc', DB_SSL: 'yes', NODE_ENV: 'staging' });
    } catch (error) {
      expect(error.message).toMatch(/PORT/);
      expect(error.message).toMatch(/DB_SSL/);
      expect(error.message).toMatch(/NODE_ENV/);
    }
  });

  it('marks production', () => {
    expect(readEnv({ ...base, NODE_ENV: 'production' }).isProduction).toBe(true);
  });

  it('cannot be changed after it is built', () => {
    expect(Object.isFrozen(readEnv(base))).toBe(true);
  });
});
