/**
 * metrics.repository.js
 * What:  Database queries for the counters, participation rows and uptime panel. Queries only.
 * Used by: services/metrics.service.js
 * Talks to: config/database.js, models/metrics.model.js
 */
import { query } from "../config/database.js";
import {
  INFRASTRUCTURE_SELECT,
  PARTICIPATION_SELECT,
  STATS_SELECT,
} from "../models/metrics.model.js";

// Gets the counters of one group: "overview" (homepage) or "campus" (metrics page).
export async function findStats(group) {
  const result = await query(
    `SELECT ${STATS_SELECT} FROM metric_stats WHERE group_name = $1 ORDER BY sort_order, id`,
    [group],
  );
  return result.rows;
}

// Gets the department participation rows.
export async function findParticipation() {
  const result = await query(
    `SELECT ${PARTICIPATION_SELECT} FROM participation_rates ORDER BY sort_order, id`,
  );
  return result.rows;
}

// Gets the single uptime panel row, or null when it has not been filled in.
export async function findInfrastructure() {
  const result = await query(
    `SELECT ${INFRASTRUCTURE_SELECT} FROM infrastructure_status LIMIT 1`,
  );
  return result.rows[0] ?? null;
}
