/**
 * security.middleware.js
 * What:  Safe default response headers (mandate Section 6). This API only sends JSON, so the
 *        content policy is the strictest one: nothing may load from it.
 * Used by: app.js
 * Talks to: helmet
 */
import helmet from "helmet";

export const securityMiddleware = helmet({
  contentSecurityPolicy: {
    directives: { defaultSrc: ["'none'"], frameAncestors: ["'none'"] },
  },
  // The API is public read data and may be called from the site on another address.
  crossOriginResourcePolicy: { policy: "cross-origin" },
});
