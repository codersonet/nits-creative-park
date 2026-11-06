/**
 * metrics.service.js
 * What:  Business logic for the counters and the metrics page data.
 * Used by: controllers/metrics.controller.js
 * Talks to: cache.service.js, repositories/metrics.repository.js, errors/AppError.js
 */
import { NotFoundError } from "../errors/AppError.js";
import * as metricsRepository from "../repositories/metrics.repository.js";
import { cached } from "./cache.service.js";

// Returns the four homepage counters as { stats: [...] }.
export function getOverview() {
  return cached("metrics-overview", {}, async () => ({
    stats: await metricsRepository.findStats("overview"),
  }));
}

// Returns everything on the metrics page: { stats, participation, infrastructure }.
export function getCampusMetrics() {
  return cached("metrics-campus", {}, async () => {
    const [stats, participation, infrastructure] = await Promise.all([
      metricsRepository.findStats("campus"),
      metricsRepository.findParticipation(),
      metricsRepository.findInfrastructure(),
    ]);
    if (!infrastructure)
      throw new NotFoundError("Campus metrics have not been published yet.");
    return { stats, participation, infrastructure };
  });
}
