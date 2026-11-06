/**
 * fest.repository.js
 * What:  Database queries for the annual fests and the spotlight fest. Queries only, no rules.
 * Used by: services/fest.service.js
 * Talks to: config/database.js, base.repository.js, models/fest.model.js
 */
import { query } from "../config/database.js";
import {
  FEATURED_FEST_SELECT,
  FEATURED_FEST_TABLE,
  FEST_ORDER,
  FEST_SELECT,
  FEST_TABLE,
} from "../models/fest.model.js";
import { findPage } from "./base.repository.js";

// Gets one page of annual fests.
export function findFests({ page, limit }) {
  return findPage({
    table: FEST_TABLE,
    select: FEST_SELECT,
    orderBy: FEST_ORDER,
    page,
    limit,
  });
}

// Gets the fest marked as active, or null when none is promoted.
export async function findFeatured() {
  const result = await query(
    `SELECT ${FEATURED_FEST_SELECT} FROM ${FEATURED_FEST_TABLE} WHERE is_active LIMIT 1`,
  );
  return result.rows[0] ?? null;
}
