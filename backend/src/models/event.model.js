/**
 * event.model.js
 * What:  The shape of an event. Dates are turned into plain "2026-11-14" text, and the three
 *        action columns are grouped into one "action" object, matching the API contract.
 * Used by: repositories/event.repository.js
 * Talks to: nothing
 */
export const EVENT_TABLE = "events";
export const EVENT_SELECT = `id, title, category, kind, accent,
  to_char(start_date, 'YYYY-MM-DD') AS "startDate",
  to_char(end_date, 'YYYY-MM-DD') AS "endDate",
  description, tags, organizer,
  json_build_object('label', action_label, 'variant', action_variant, 'url', action_url) AS action`;
export const EVENT_ORDER = "start_date, id";
