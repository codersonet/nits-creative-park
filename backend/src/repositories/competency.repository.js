/**
 * competency.repository.js
 * What:  Database queries for skill-strength cards. Queries only, no rules.
 * Used by: services/competency.service.js
 * Talks to: base.repository.js, models/competency.model.js
 */
import { COMPETENCY_TABLE, COMPETENCY_SELECT, COMPETENCY_ORDER } from '../models/competency.model.js';
import { findPage } from './base.repository.js';

// Gets one page of rows.
export function findCompetencies({ page, limit }) {
  return findPage({ table: COMPETENCY_TABLE, select: COMPETENCY_SELECT, orderBy: COMPETENCY_ORDER, page, limit });
}
