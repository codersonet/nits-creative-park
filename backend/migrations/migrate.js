/**
 * migrate.js
 * What:  Applies database changes in order and remembers which ones ran (mandate Section 5).
 *        Commands:  up (apply all new)  |  down (undo the last one)  |  status
 *        Each change runs in its own transaction, and a lock stops two copies from migrating at once.
 * Used by: npm run migrate / migrate:down / migrate:status, the "migrate" Docker service, tests
 * Talks to: config/database.js, logger/logger.js, the *.up.sql and *.down.sql files beside it
 */
import { readFile, readdir } from 'node:fs/promises';
import path from 'node:path';
import { fileURLToPath, pathToFileURL } from 'node:url';
import { closeDatabase, pool } from '../src/config/database.js';
import { logger } from '../src/logger/logger.js';

const MIGRATIONS_DIR = path.dirname(fileURLToPath(import.meta.url));
// An arbitrary number that identifies "the migration lock" inside the database.
const LOCK_ID = 727274;

// Picks the migration names out of a list of file names, in order: ['001_a.up.sql', ...] -> ['001_a', ...]
export function listMigrations(fileNames) {
  return fileNames
    .filter((name) => /^\d{3}_[a-z0-9_]+\.up\.sql$/.test(name))
    .map((name) => name.replace('.up.sql', ''))
    .sort();
}

// Runs one migration file inside a transaction and records (or forgets) it.
async function applyOne(client, directory, version, direction) {
  const sql = await readFile(path.join(directory, `${version}.${direction}.sql`), 'utf8');
  await client.query('BEGIN');
  try {
    await client.query(sql);
    await client.query(
      direction === 'up'
        ? 'INSERT INTO schema_migrations (version) VALUES ($1)'
        : 'DELETE FROM schema_migrations WHERE version = $1',
      [version],
    );
    await client.query('COMMIT');
    logger.info({ version, direction }, 'Migration applied');
  } catch (error) {
    await client.query('ROLLBACK');
    throw error;
  }
}

// Runs "up", "down" or "status". Returns { applied, pending } as they were before the command.
export async function migrate(command, directory = MIGRATIONS_DIR) {
  const client = await pool.connect();
  try {
    await client.query('SELECT pg_advisory_lock($1)', [LOCK_ID]);
    await client.query(
      `CREATE TABLE IF NOT EXISTS schema_migrations (
         version text PRIMARY KEY, applied_at timestamptz NOT NULL DEFAULT now())`,
    );
    const rows = (await client.query('SELECT version FROM schema_migrations ORDER BY version')).rows;
    const appliedSet = new Set(rows.map((row) => row.version));
    const all = listMigrations(await readdir(directory));
    const pending = all.filter((version) => !appliedSet.has(version));

    if (command === 'up') {
      for (const version of pending) await applyOne(client, directory, version, 'up');
    } else if (command === 'down') {
      const last = [...all].reverse().find((version) => appliedSet.has(version));
      if (last) await applyOne(client, directory, last, 'down');
    }
    return { applied: [...appliedSet], pending };
  } finally {
    await client.query('SELECT pg_advisory_unlock($1)', [LOCK_ID]).catch(() => {});
    client.release();
  }
}

// Runs only when started directly from the command line.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  const command = process.argv[2] ?? 'status';
  if (!['up', 'down', 'status'].includes(command)) {
    process.stderr.write('Usage: node migrations/migrate.js up|down|status\n');
    process.exit(1);
  }
  try {
    const result = await migrate(command);
    if (command === 'status') process.stdout.write(`${JSON.stringify(result, null, 2)}\n`);
  } catch (error) {
    logger.error({ err: error }, 'Migration failed');
    process.exitCode = 1;
  } finally {
    await closeDatabase();
  }
}
