/**
 * requestId.middleware.js
 * What:  Gives every request an ID, so one visitor's problem can be found in the logs
 *        (mandate Section 9). A good ID sent by the proxy is kept, anything else is replaced.
 * Used by: app.js
 * Talks to: nothing
 */
import { randomUUID } from 'node:crypto';

const SAFE_ID = /^[A-Za-z0-9-]{8,64}$/;

// Sets req.id and the X-Request-Id answer header.
export function requestId(req, res, next) {
  const incoming = req.headers['x-request-id'];
  req.id = typeof incoming === 'string' && SAFE_ID.test(incoming) ? incoming : randomUUID();
  res.setHeader('X-Request-Id', req.id);
  next();
}
