/**
 * project.service.js
 * What:  Fetches student projects (GET /projects).
 * Used by: hooks/useProjects.js
 * Talks to: apiClient.js, or mocks/projects.mock.js while VITE_USE_MOCK_DATA=true
 */
import { ALL_CATEGORY } from "@/constants/categories.js";
import { USE_MOCK_DATA } from "@/constants/env.js";
import { DEFAULT_PAGE_LIMIT } from "@/constants/pagination.js";
import { apiGet } from "./apiClient.js";

// Gets one page of projects, for one category or for all of them.
// Returns { items, page, limit, total }.
export async function getProjects({
  category = ALL_CATEGORY,
  page = 1,
  limit = DEFAULT_PAGE_LIMIT,
  signal,
} = {}) {
  if (USE_MOCK_DATA) {
    // PERF: placeholder data loads only when needed, so it stays out of the main bundle.
    const [{ projectsMock }, { filterMockByCategory, paginateMock }] =
      await Promise.all([
        import("./mocks/projects.mock.js"),
        import("./mocks/mock-helpers.js"),
      ]);
    return paginateMock(filterMockByCategory(projectsMock, category), {
      page,
      limit,
    });
  }
  const categoryParam = category === ALL_CATEGORY ? undefined : category;
  return apiGet("/projects", {
    params: { category: categoryParam, page, limit },
    signal,
  });
}
