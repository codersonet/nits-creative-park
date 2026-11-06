/**
 * server.js
 * What:  Starts the server and shuts it down cleanly: on SIGTERM it stops taking new requests,
 *        lets running ones finish, then closes the database and cache (mandate Section 7).
 * Used by: npm start, Docker
 * Talks to: app.js, config/*, logger/logger.js
 */
import { createApp } from "./app.js";
import { closeCache } from "./config/cache.js";
import { closeDatabase } from "./config/database.js";
import { env } from "./config/env.js";
import { logger } from "./logger/logger.js";

const SHUTDOWN_GRACE_MS = 10000;

const server = createApp().listen(env.port, () => {
  logger.info({ port: env.port, env: env.nodeEnv }, "API listening");
});

// WHY: these must be longer than the proxy's idle time (60 s), or the proxy can send a request
// down a connection the API is just closing, which shows up as random 502 errors.
server.keepAliveTimeout = 65000;
server.headersTimeout = 66000;
server.requestTimeout = 15000;

let shuttingDown = false;

// Stops accepting requests, waits for running ones, then closes connections.
async function shutdown(signal) {
  if (shuttingDown) return;
  shuttingDown = true;
  logger.info({ signal }, "Shutting down");
  const forceExit = setTimeout(() => {
    logger.error("Shutdown took too long, exiting");
    process.exit(1);
  }, SHUTDOWN_GRACE_MS);
  forceExit.unref();

  server.close(async () => {
    await Promise.allSettled([closeDatabase(), closeCache()]);
    logger.info("Shutdown complete");
    process.exit(0);
  });
}

process.on("SIGTERM", () => shutdown("SIGTERM"));
process.on("SIGINT", () => shutdown("SIGINT"));
// A bug we did not expect leaves the app in an unknown state, so log it and let Docker restart us.
process.on("unhandledRejection", (reason) => {
  logger.fatal({ err: reason }, "Unhandled promise rejection");
  process.exit(1);
});
process.on("uncaughtException", (error) => {
  logger.fatal({ err: error }, "Uncaught exception");
  process.exit(1);
});
