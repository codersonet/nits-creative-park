/**
 * seed.js
 * What:  Loads the placeholder content (seeds/*.sql) into the database in one transaction, then
 *        clears the cache. The seed REPLACES the content tables, so it refuses to run in
 *        production unless ALLOW_SEED=true.
 * Used by: npm run seed, the integration tests
 * Talks to: config/database.js, config/env.js, services/cache.service.js, the *.sql files beside it
 */
import { readFile, readdir } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath, pathToFileURL } from "node:url";
import { closeCache } from "../src/config/cache.js";
import { closeDatabase, pool } from "../src/config/database.js";
import { env } from "../src/config/env.js";
import { logger } from "../src/logger/logger.js";
import { clearContentCache } from "../src/services/cache.service.js";

const SEEDS_DIR = path.dirname(fileURLToPath(import.meta.url));

// Runs every seed file in name order. Everything succeeds together or nothing changes.
export async function runSeeds(directory = SEEDS_DIR) {
  if (env.isProduction && !env.allowSeed) {
    throw new Error(
      "Seeding is blocked in production because it replaces the content tables. Set ALLOW_SEED=true only if you really mean it.",
    );
  }
  const files = (await readdir(directory))
    .filter((name) => name.endsWith(".sql"))
    .sort();
  const client = await pool.connect();
  try {
    await client.query("BEGIN");
    for (const file of files) {
      await client.query(await readFile(path.join(directory, file), "utf8"));
      logger.info({ file }, "Seed applied");
    }
    await client.query("COMMIT");
  } catch (error) {
    await client.query("ROLLBACK");
    throw error;
  } finally {
    client.release();
  }
  const cleared = await clearContentCache();
  logger.info(
    { files: files.length, cacheEntriesCleared: cleared },
    "Seeding finished",
  );
}

// Runs only when started directly (npm run seed).
if (
  process.argv[1] &&
  import.meta.url === pathToFileURL(process.argv[1]).href
) {
  try {
    await runSeeds();
  } catch (error) {
    logger.error({ err: error }, "Seeding failed");
    process.exitCode = 1;
  } finally {
    await Promise.allSettled([closeDatabase(), closeCache()]);
  }
}
