/**
 * contact.repository.js
 * What:  Database queries for contact messages: save one, delete old ones. Queries only.
 * Used by: services/contact.service.js, jobs/purgeContactMessages.job.js
 * Talks to: config/database.js
 */
import { query } from '../config/database.js';

// Saves one message. All values are passed as parameters.
export async function insertMessage({ name, email, skills, subject, message }) {
  const result = await query(
    `INSERT INTO contact_messages (name, email, skills, subject, message)
     VALUES ($1, $2, $3, $4, $5) RETURNING id`,
    [name, email, skills, subject, message],
  );
  return result.rows[0].id;
}

// Deletes messages older than the given number of days. Returns how many were deleted.
export async function deleteOlderThan(days) {
  const result = await query(
    `DELETE FROM contact_messages WHERE created_at < now() - ($1 * interval '1 day')`,
    [days],
  );
  return result.rowCount;
}
