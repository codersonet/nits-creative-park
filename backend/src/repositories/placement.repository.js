/**
 * placement.repository.js
 * What:  Database query for the current placement figures. Queries only, no rules.
 * Used by: services/placement.service.js
 * Talks to: config/database.js, models/placement.model.js
 */
import { query } from '../config/database.js';
import { PLACEMENT_SELECT, PLACEMENT_TABLE } from '../models/placement.model.js';

// Gets the row marked as current, or null when there is none.
export async function findCurrent() {
  const result = await query(`SELECT ${PLACEMENT_SELECT} FROM ${PLACEMENT_TABLE} WHERE is_current LIMIT 1`);
  return result.rows[0] ?? null;
}
