/**
 * content.routes.js
 * What:  Maps the public read URLs to controllers. Mapping only: no logic here.
 * Used by: routes/index.js
 * Talks to: controllers/content.controller.js, validators/list.validator.js, middleware
 */
import { Router } from "express";
import * as content from "../controllers/content.controller.js";
import { publicCache } from "../middleware/cacheControl.middleware.js";
import { validateQuery } from "../middleware/validate.middleware.js";
import {
  eventQuery,
  pageQuery,
  projectQuery,
} from "../validators/list.validator.js";

const router = Router();

router.get(
  "/projects",
  publicCache,
  validateQuery(projectQuery),
  content.listProjects,
);
router.get(
  "/events",
  publicCache,
  validateQuery(eventQuery),
  content.listEvents,
);
router.get(
  "/alumni",
  publicCache,
  validateQuery(pageQuery),
  content.listAlumni,
);
router.get(
  "/companies",
  publicCache,
  validateQuery(pageQuery),
  content.listCompanies,
);
router.get(
  "/competencies",
  publicCache,
  validateQuery(pageQuery),
  content.listCompetencies,
);
router.get("/fests", publicCache, validateQuery(pageQuery), content.listFests);
router.get("/fests/featured", publicCache, content.getFeaturedFest);
router.get("/placement-stats", publicCache, content.getPlacementStats);

export default router;
