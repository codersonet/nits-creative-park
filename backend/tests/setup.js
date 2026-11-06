/**
 * setup.js
 * What:  Test setup: quiet logs, a fake database address for unit tests, and no cache.
 *        Integration tests use TEST_DATABASE_URL when it is set.
 * Used by: Vitest (listed in vitest.config.js)
 * Talks to: nothing
 */
process.env.NODE_ENV = 'test';
process.env.LOG_LEVEL = 'silent';
// Unit tests never connect, so a made-up address is enough for the config check to pass.
process.env.DATABASE_URL = process.env.TEST_DATABASE_URL ?? 'postgres://test:test@localhost:5432/test';
// Tests never use a real cache.
delete process.env.REDIS_URL;
