/**
 * contact.routes.js
 * What:  Maps POST /contact-messages: strict rate limit, then validation, then the controller.
 * Used by: routes/index.js
 * Talks to: controllers/contact.controller.js, validators/contact.validator.js, middleware
 */
import { Router } from "express";
import { createContactMessage } from "../controllers/contact.controller.js";
import { noStore } from "../middleware/cacheControl.middleware.js";
import { contactLimiter } from "../middleware/rateLimit.middleware.js";
import { validateBody } from "../middleware/validate.middleware.js";
import { validateContactMessage } from "../validators/contact.validator.js";

const router = Router();

router.post(
  "/contact-messages",
  noStore,
  contactLimiter,
  validateBody(validateContactMessage),
  createContactMessage,
);

export default router;
