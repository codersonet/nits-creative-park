/**
 * health.routes.js
 * What:  Maps the health URLs. They sit outside /api so they are never rate-limited.
 * Used by: app.js
 * Talks to: controllers/health.controller.js, middleware/cacheControl.middleware.js
 */
import { Router } from "express";
import { liveness, readiness } from "../controllers/health.controller.js";
import { noStore } from "../middleware/cacheControl.middleware.js";

const router = Router();

router.get("/health", noStore, liveness);
router.get("/ready", noStore, readiness);

export default router;
