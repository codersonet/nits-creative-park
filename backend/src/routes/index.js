/**
 * index.js
 * What:  Joins every route group under one router, mounted at /api/v1 by app.js.
 * Used by: app.js
 * Talks to: content.routes.js, metrics.routes.js, contact.routes.js
 */
import { Router } from "express";
import contactRoutes from "./contact.routes.js";
import contentRoutes from "./content.routes.js";
import metricsRoutes from "./metrics.routes.js";

const router = Router();

router.use(contentRoutes);
router.use(metricsRoutes);
router.use(contactRoutes);

export default router;
