/**
 * company.repository.js
 * What:  Database queries for recruitment partners. Queries only, no rules.
 * Used by: services/company.service.js
 * Talks to: base.repository.js, models/company.model.js
 */
import {
  COMPANY_TABLE,
  COMPANY_SELECT,
  COMPANY_ORDER,
} from "../models/company.model.js";
import { findPage } from "./base.repository.js";

// Gets one page of rows.
export function findCompanies({ page, limit }) {
  return findPage({
    table: COMPANY_TABLE,
    select: COMPANY_SELECT,
    orderBy: COMPANY_ORDER,
    page,
    limit,
  });
}
