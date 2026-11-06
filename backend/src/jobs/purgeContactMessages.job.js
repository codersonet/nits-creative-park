/**
 * purgeContactMessages.job.js
 * What:  Deletes contact messages older than CONTACT_RETENTION_DAYS. Messages hold personal
 *        details, so they are not kept forever (privacy: keep data only as long as needed).
 * Used by: a scheduler (cron or a scheduled CI job) running `npm run job:purge-contact`
 * Talks to: repositories/contact.repository.js, config/env.js, config/database.js
 */
import { pathToFileURL } from 'node:url';
import { closeDatabase } from '../config/database.js';
import { env } from '../config/env.js';
import { logger } from '../logger/logger.js';
import * as contactRepository from '../repositories/contact.repository.js';

// Deletes the old messages and returns how many were removed.
// "repository" can be replaced in tests.
export async function purgeOldContactMessages(
  days = env.contactRetentionDays,
  repository = contactRepository,
) {
  const removed = await repository.deleteOlderThan(days);
  logger.info({ removed, days }, 'Old contact messages deleted');
  return removed;
}

// Runs only when started directly (npm run job:purge-contact), not when imported by tests.
if (process.argv[1] && import.meta.url === pathToFileURL(process.argv[1]).href) {
  try {
    await purgeOldContactMessages();
  } catch (error) {
    logger.error({ err: error }, 'Purge job failed');
    process.exitCode = 1;
  } finally {
    await closeDatabase();
  }
}
