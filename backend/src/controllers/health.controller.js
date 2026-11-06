/**
 * health.controller.js
 * What:  Handles the two health endpoints used by Docker, the proxy and uptime monitors.
 * Used by: routes/health.routes.js
 * Talks to: services/health.service.js, errors/AppError.js
 */
import { NotReadyError } from "../errors/AppError.js";
import * as healthService from "../services/health.service.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ok } from "../utils/response.js";

// GET /health : "the process is running". It checks nothing else, so it stays fast and never flaps.
export function liveness(req, res) {
  res.json(ok({ status: "ok" }, req.id));
}

// GET /ready : "the API can serve traffic". 503 while the database is unreachable.
export const readiness = asyncHandler(async (req, res) => {
  const { ready, database, cache } = await healthService.checkReadiness();
  if (!ready) throw new NotReadyError();
  res.json(ok({ database, cache }, req.id));
});
