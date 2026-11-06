/**
 * fest.service.js
 * What:  Fetches the annual fests (GET /fests) and the spotlight fest (GET /fests/featured).
 * Used by: hooks/useFests.js, hooks/useFeaturedFest.js
 * Talks to: apiClient.js, or mocks/fests.mock.js while VITE_USE_MOCK_DATA=true
 */
import { USE_MOCK_DATA } from "@/constants/env.js";
import { DEFAULT_PAGE_LIMIT } from "@/constants/pagination.js";
import { apiGet } from "./apiClient.js";

// Gets one page of annual fests. Returns { items, page, limit, total }.
export async function getFests({
  page = 1,
  limit = DEFAULT_PAGE_LIMIT,
  signal,
} = {}) {
  if (USE_MOCK_DATA) {
    const [{ festsMock }, { paginateMock }] = await Promise.all([
      import("./mocks/fests.mock.js"),
      import("./mocks/mock-helpers.js"),
    ]);
    return paginateMock(festsMock, { page, limit });
  }
  return apiGet("/fests", { params: { page, limit }, signal });
}

// Gets the fest shown large at the top of the events page. The real API may return null
// when no fest is being promoted, so the page must handle that.
export async function getFeaturedFest({ signal } = {}) {
  if (USE_MOCK_DATA) {
    const { featuredFestMock } = await import("./mocks/fests.mock.js");
    return featuredFestMock;
  }
  return apiGet("/fests/featured", { signal });
}
