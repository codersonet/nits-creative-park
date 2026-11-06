/**
 * alumni.service.js
 * What:  Fetches the alumni directory (GET /alumni).
 * Used by: hooks/useAlumni.js
 * Talks to: apiClient.js, or mocks/alumni.mock.js while VITE_USE_MOCK_DATA=true
 */
import { USE_MOCK_DATA } from "@/constants/env.js";
import { DEFAULT_PAGE_LIMIT } from "@/constants/pagination.js";
import { apiGet } from "./apiClient.js";

// Gets one page of alumni. Returns { items, page, limit, total }.
export async function getAlumni({
  page = 1,
  limit = DEFAULT_PAGE_LIMIT,
  signal,
} = {}) {
  if (USE_MOCK_DATA) {
    const [{ alumniMock }, { paginateMock }] = await Promise.all([
      import("./mocks/alumni.mock.js"),
      import("./mocks/mock-helpers.js"),
    ]);
    return paginateMock(alumniMock, { page, limit });
  }
  return apiGet("/alumni", { params: { page, limit }, signal });
}
