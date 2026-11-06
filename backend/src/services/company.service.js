/**
 * company.service.js
 * What:  Business logic for recruitment partners: reads through the cache, falls back to the repository.
 * Used by: controllers/content.controller.js
 * Talks to: cache.service.js, repositories/company.repository.js
 */
import * as companyRepository from "../repositories/company.repository.js";
import { cachedPage } from "./cache.service.js";

// Returns one page: { items, page, limit, total }. "query" is the already-checked page request.
export function listCompanies(query) {
  return cachedPage("companies", query, () =>
    companyRepository.findCompanies(query),
  );
}
