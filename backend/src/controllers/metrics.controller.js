/**
 * metrics.controller.js
 * What:  Handles the two metrics endpoints.
 * Used by: routes/metrics.routes.js
 * Talks to: services/metrics.service.js
 */
import * as metricsService from "../services/metrics.service.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ok } from "../utils/response.js";

// GET /metrics/overview
export const getOverview = asyncHandler(async (req, res) => {
  res.json(ok(await metricsService.getOverview(), req.id));
});

// GET /metrics/campus
export const getCampusMetrics = asyncHandler(async (req, res) => {
  res.json(ok(await metricsService.getCampusMetrics(), req.id));
});
