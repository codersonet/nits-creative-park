/**
 * alumni.repository.js
 * What:  Database queries for the alumni directory. Queries only, no rules.
 * Used by: services/alumni.service.js
 * Talks to: base.repository.js, models/alumni.model.js
 */
import {
  ALUMNI_TABLE,
  ALUMNI_SELECT,
  ALUMNI_ORDER,
} from "../models/alumni.model.js";
import { findPage } from "./base.repository.js";

// Gets one page of rows.
export function findAlumni({ page, limit }) {
  return findPage({
    table: ALUMNI_TABLE,
    select: ALUMNI_SELECT,
    orderBy: ALUMNI_ORDER,
    page,
    limit,
  });
}
