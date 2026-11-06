/**
 * event.repository.js
 * What:  Database queries for scheduled events. Queries only, no rules.
 * Used by: services/event.service.js
 * Talks to: base.repository.js, models/event.model.js
 */
import { EVENT_TABLE, EVENT_SELECT, EVENT_ORDER } from '../models/event.model.js';
import { findPage } from './base.repository.js';

// Gets one page, optionally only one category. The category is passed as a parameter.
export function findEvents({ category, page, limit }) {
  return findPage({
    table: EVENT_TABLE,
    select: EVENT_SELECT,
    orderBy: EVENT_ORDER,
    where: category ? 'category = $1' : '',
    params: category ? [category] : [],
    page,
    limit,
  });
}
