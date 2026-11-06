/**
 * project.model.js
 * What:  The shape of a project: its table, the columns sent to visitors, and the sort order.
 * Used by: repositories/project.repository.js
 * Talks to: nothing (these are fixed SQL pieces, never built from visitor input)
 */
export const PROJECT_TABLE = 'projects';
export const PROJECT_SELECT = 'id, title, club, category, description, progress, stack, status';
export const PROJECT_ORDER = 'sort_order, id';
