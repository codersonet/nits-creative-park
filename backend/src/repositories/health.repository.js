/**
 * health.repository.js
 * What:  The cheapest possible database question, to prove the database answers.
 * Used by: services/health.service.js
 * Talks to: config/database.js
 */
import { query } from '../config/database.js';

// Resolves when the database answers, and fails when it does not.
export async function pingDatabase() {
  await query('SELECT 1');
}
