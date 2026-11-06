/**
 * base.repository.js
 * What:  One reusable "give me a page of rows" query, so every list repository stays tiny.
 * Used by: the *.repository.js files of every list resource
 * Talks to: config/database.js, utils/pagination.js
 */
import { query } from '../config/database.js';
import { toOffset } from '../utils/pagination.js';

// SECURITY: "table", "select", "where" and "orderBy" must be fixed text from the models or the
// repository itself, NEVER visitor input. Visitor values go only into "params" ($1, $2, ...).
// "limit" and "offset" are numbers already checked by the validator, and are passed as parameters too.
// "run" is the function that sends SQL to the database (tests pass a fake).
export async function findPage(
  { table, select, where = '', orderBy, params = [], page, limit },
  run = query,
) {
  const whereSql = where ? `WHERE ${where}` : '';
  const limitSlot = params.length + 1;
  const [items, count] = await Promise.all([
    run(
      `SELECT ${select} FROM ${table} ${whereSql} ORDER BY ${orderBy} LIMIT $${limitSlot} OFFSET $${limitSlot + 1}`,
      [...params, limit, toOffset(page, limit)],
    ),
    run(`SELECT COUNT(*)::int AS total FROM ${table} ${whereSql}`, params),
  ]);
  return { items: items.rows, total: count.rows[0].total };
}
