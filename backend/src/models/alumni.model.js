/**
 * alumni.model.js
 * What:  The shape of an alumnus (columns are renamed to the API's camelCase names).
 * Used by: repositories/alumni.repository.js
 * Talks to: nothing
 */
export const ALUMNI_TABLE = 'alumni';
export const ALUMNI_SELECT = `id, name, class_year AS "classYear", role, company, branch, location,
  bio, linkedin_url AS "linkedinUrl"`;
export const ALUMNI_ORDER = 'sort_order, id';
