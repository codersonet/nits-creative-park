/**
 * company.service.js
 * What:  Fetches the recruitment partner list (GET /companies).
 * Used by: hooks/useCompanies.js
 * Talks to: apiClient.js, or mocks/companies.mock.js while VITE_USE_MOCK_DATA=true
 */
import { USE_MOCK_DATA } from "@/constants/env.js";
import { DEFAULT_PAGE_LIMIT } from "@/constants/pagination.js";
import { apiGet } from "./apiClient.js";

// Gets one page of partner companies. Returns { items, page, limit, total }.
export async function getCompanies({
  page = 1,
  limit = DEFAULT_PAGE_LIMIT,
  signal,
} = {}) {
  if (USE_MOCK_DATA) {
    const [{ companiesMock }, { paginateMock }] = await Promise.all([
      import("./mocks/companies.mock.js"),
      import("./mocks/mock-helpers.js"),
    ]);
    return paginateMock(companiesMock, { page, limit });
  }
  return apiGet("/companies", { params: { page, limit }, signal });
}
