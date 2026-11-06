/**
 * httpLogger.js
 * What:  Logs one line per request: method, address, status, time and the request ID.
 *        Health checks are skipped so they do not fill the logs.
 * Used by: app.js
 * Talks to: pino-http, logger.js
 */
import pinoHttp from "pino-http";
import { logger } from "./logger.js";

// 5xx is an error, 4xx is a warning (the visitor's mistake), everything else is normal.
function pickLevel(req, res, error) {
  if (error || res.statusCode >= 500) return "error";
  if (res.statusCode >= 400) return "warn";
  return "info";
}

export const httpLogger = pinoHttp({
  logger,
  genReqId: (req) => req.id,
  customLogLevel: pickLevel,
  autoLogging: { ignore: (req) => req.url === "/health" },
  serializers: {
    req: (req) => ({ id: req.id, method: req.method, url: req.url }),
    res: (res) => ({ statusCode: res.statusCode }),
  },
});
