/**
 * env.js
 * What:  Reads and checks every setting once, at start-up. A wrong or missing setting stops the
 *        program with a clear message instead of failing later in a strange way (mandate Section 6.6).
 * Used by: every file that needs a setting
 * Talks to: process.env (the only file allowed to read it)
 */
const NODE_ENVS = ['development', 'test', 'production'];
const LOG_LEVELS = ['fatal', 'error', 'warn', 'info', 'debug', 'trace', 'silent'];

// Builds the settings object from a source of text values. "source" is injectable for tests.
export function readEnv(source = process.env) {
  const problems = [];

  // Reads a whole number between min and max, or uses the fallback when the setting is empty.
  function readInt(name, fallback, min, max) {
    const raw = source[name];
    if (raw === undefined || raw === '') return fallback;
    const value = Number(raw);
    if (!Number.isInteger(value) || value < min || value > max) {
      problems.push(`${name} must be a whole number from ${min} to ${max}`);
      return fallback;
    }
    return value;
  }

  // Reads "true" or "false". Anything else is a mistake worth stopping for.
  function readBool(name, fallback) {
    const raw = source[name];
    if (raw === undefined || raw === '') return fallback;
    if (raw !== 'true' && raw !== 'false') problems.push(`${name} must be "true" or "false"`);
    return raw === 'true';
  }

  const nodeEnv = source.NODE_ENV || 'development';
  if (!NODE_ENVS.includes(nodeEnv)) problems.push(`NODE_ENV must be one of ${NODE_ENVS.join(', ')}`);

  const logLevel = source.LOG_LEVEL || 'info';
  if (!LOG_LEVELS.includes(logLevel)) problems.push(`LOG_LEVEL must be one of ${LOG_LEVELS.join(', ')}`);

  const databaseUrl = source.DATABASE_URL || '';
  if (!databaseUrl) problems.push('DATABASE_URL is required');

  const config = {
    nodeEnv,
    isProduction: nodeEnv === 'production',
    port: readInt('PORT', 4000, 1, 65535),
    logLevel,
    databaseUrl,
    dbPoolMax: readInt('DB_POOL_MAX', 10, 1, 100),
    dbStatementTimeoutMs: readInt('DB_STATEMENT_TIMEOUT_MS', 5000, 100, 60000),
    dbSsl: readBool('DB_SSL', false),
    redisUrl: source.REDIS_URL || null,
    cacheTtlSeconds: readInt('CACHE_TTL_SECONDS', 300, 1, 86400),
    corsOrigins: (source.CORS_ORIGINS || '').split(',').map((item) => item.trim()).filter(Boolean),
    trustProxy: readInt('TRUST_PROXY', 1, 0, 10),
    rateLimitPerMinute: readInt('RATE_LIMIT_PER_MINUTE', 300, 1, 100000),
    contactRateLimitPerHour: readInt('CONTACT_RATE_LIMIT_PER_HOUR', 5, 1, 1000),
    contactRetentionDays: readInt('CONTACT_RETENTION_DAYS', 365, 1, 3650),
    allowSeed: readBool('ALLOW_SEED', false),
  };

  if (problems.length > 0) {
    throw new Error(`Invalid configuration:\n- ${problems.join('\n- ')}`);
  }
  return Object.freeze(config);
}

export const env = readEnv();
