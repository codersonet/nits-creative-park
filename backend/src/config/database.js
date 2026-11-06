/**
 * database.js
 * What:  The PostgreSQL connection pool and one safe way to run a query. Queries that run
 *        longer than half a second are logged so slow ones can be found (mandate Section 5).
 * Used by: repositories/*.js, migrations/migrate.js, seeds/seed.js
 * Talks to: pg, config/env.js, logger/logger.js
 */
import pg from 'pg';
import { logger } from '../logger/logger.js';
import { env } from './env.js';

const SLOW_QUERY_MS = 500;

// The pool opens connections only when the first query arrives.
export const pool = new pg.Pool({
  connectionString: env.databaseUrl,
  max: env.dbPoolMax,
  idleTimeoutMillis: 30000,
  connectionTimeoutMillis: 5000,
  // WHY: a runaway query is cancelled by the database instead of holding a connection forever.
  statement_timeout: env.dbStatementTimeoutMs,
  ssl: env.dbSsl ? { rejectUnauthorized: true } : false,
});

// An idle connection can fail (for example after a database restart). Log it, do not crash.
pool.on('error', (error) => {
  logger.error({ err: error }, 'Unexpected error on an idle database connection');
});

// Runs one query. ALWAYS pass visitor-supplied values in "params" ($1, $2, ...), never inside "text".
export async function query(text, params = []) {
  const start = performance.now();
  const result = await pool.query(text, params);
  const elapsed = performance.now() - start;
  if (elapsed > SLOW_QUERY_MS) {
    logger.warn({ ms: Math.round(elapsed), sql: text.replace(/\s+/g, ' ').slice(0, 120) }, 'Slow query');
  }
  return result;
}

// Closes every connection. Used during shutdown.
export function closeDatabase() {
  return pool.end();
}
