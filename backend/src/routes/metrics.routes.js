/**
 * metrics.routes.js
 * What:  Maps the two metrics URLs to controllers.
 * Used by: routes/index.js
 * Talks to: controllers/metrics.controller.js, middleware/cacheControl.middleware.js
 */
import { Router } from 'express';
import * as metrics from '../controllers/metrics.controller.js';
import { publicCache } from '../middleware/cacheControl.middleware.js';

const router = Router();

router.get('/metrics/overview', publicCache, metrics.getOverview);
router.get('/metrics/campus', publicCache, metrics.getCampusMetrics);

export default router;
