/**
 * placement.service.js
 * What:  Fetches the headline placement figures (GET /placement-stats).
 * Used by: hooks/usePlacementStats.js
 * Talks to: apiClient.js, or mocks/placement.mock.js while VITE_USE_MOCK_DATA=true
 */
import { USE_MOCK_DATA } from "@/constants/env.js";
import { apiGet } from "./apiClient.js";

// Gets the latest placement numbers as one object.
export async function getPlacementStats({ signal } = {}) {
  if (USE_MOCK_DATA) {
    const { placementStatsMock } = await import("./mocks/placement.mock.js");
    return placementStatsMock;
  }
  return apiGet("/placement-stats", { signal });
}
