/**
 * fest.model.js
 * What:  The shape of the annual fests and of the spotlight (featured) fest.
 * Used by: repositories/fest.repository.js
 * Talks to: nothing
 */
export const FEST_TABLE = "fests";
export const FEST_SELECT = `id, number, name, kind, season, timeline, accent, description, tags,
  image_url AS "imageUrl", image_alt AS "imageAlt", filter_category AS "filterCategory"`;
export const FEST_ORDER = "sort_order, id";

export const FEATURED_FEST_TABLE = "featured_fests";
export const FEATURED_FEST_SELECT = `id, name, tagline, description,
  to_char(start_date, 'YYYY-MM-DD') AS "startDate",
  to_char(end_date, 'YYYY-MM-DD') AS "endDate",
  registration_open AS "registrationOpen", highlights, facts,
  primary_action AS "primaryAction", secondary_action AS "secondaryAction", image`;
