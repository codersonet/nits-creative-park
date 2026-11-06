/**
 * competency.model.js
 * What:  The shape of a skill-strength card.
 * Used by: repositories/competency.repository.js
 * Talks to: nothing
 */
export const COMPETENCY_TABLE = 'competencies';
export const COMPETENCY_SELECT = 'id, code, title, percent, description, tags, accent';
export const COMPETENCY_ORDER = 'sort_order, id';
