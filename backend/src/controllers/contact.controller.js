/**
 * contact.controller.js
 * What:  Handles POST /contact-messages: save the checked message, answer "created".
 * Used by: routes/contact.routes.js
 * Talks to: services/contact.service.js
 */
import * as contactService from "../services/contact.service.js";
import { asyncHandler } from "../utils/async-handler.js";
import { ok } from "../utils/response.js";

// The answer carries no data on purpose: the sender gets nothing that could be used to probe the system.
export const createContactMessage = asyncHandler(async (req, res) => {
  await contactService.submitContactMessage(req.validated);
  res.status(201).json(ok(null, req.id));
});
