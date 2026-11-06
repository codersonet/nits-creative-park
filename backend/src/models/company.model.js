/**
 * company.model.js
 * What:  The shape of a recruitment partner.
 * Used by: repositories/company.repository.js
 * Talks to: nothing
 */
export const COMPANY_TABLE = "companies";
export const COMPANY_SELECT = 'id, name, logo_path AS "logoPath"';
export const COMPANY_ORDER = "sort_order, id";
