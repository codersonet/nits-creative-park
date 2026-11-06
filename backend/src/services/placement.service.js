/**
 * placement.service.js
 * What:  Business logic for the placement figures. No current row means "not found".
 * Used by: controllers/content.controller.js
 * Talks to: cache.service.js, repositories/placement.repository.js, errors/AppError.js
 */
import { NotFoundError } from "../errors/AppError.js";
import * as placementRepository from "../repositories/placement.repository.js";
import { cached } from "./cache.service.js";

// Returns the current placement figures as one object.
export async function getCurrentPlacementStats() {
  const stats = await cached("placement-stats", {}, () =>
    placementRepository.findCurrent(),
  );
  if (!stats)
    throw new NotFoundError("Placement figures have not been published yet.");
  return stats;
}
