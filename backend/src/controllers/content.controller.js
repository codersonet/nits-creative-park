/**
 * content.controller.js
 * What:  Handles the public read endpoints: read the checked request, call one service,
 *        send the standard answer. No rules and no database code here.
 * Used by: routes/content.routes.js
 * Talks to: the project, event, alumni, company, competency, placement and fest services
 */
import * as alumniService from '../services/alumni.service.js';
import * as companyService from '../services/company.service.js';
import * as competencyService from '../services/competency.service.js';
import * as eventService from '../services/event.service.js';
import * as festService from '../services/fest.service.js';
import * as placementService from '../services/placement.service.js';
import * as projectService from '../services/project.service.js';
import { asyncHandler } from '../utils/async-handler.js';
import { ok } from '../utils/response.js';

// Builds a controller that sends one page of a list. "listFn" is the service function to call.
function pageController(listFn) {
  return asyncHandler(async (req, res) => {
    res.json(ok(await listFn(req.validated), req.id));
  });
}

export const listProjects = pageController(projectService.listProjects);
export const listEvents = pageController(eventService.listEvents);
export const listAlumni = pageController(alumniService.listAlumni);
export const listCompanies = pageController(companyService.listCompanies);
export const listCompetencies = pageController(competencyService.listCompetencies);
export const listFests = pageController(festService.listFests);

// GET /placement-stats
export const getPlacementStats = asyncHandler(async (req, res) => {
  res.json(ok(await placementService.getCurrentPlacementStats(), req.id));
});

// GET /fests/featured  (data is null when no fest is promoted)
export const getFeaturedFest = asyncHandler(async (req, res) => {
  res.json(ok(await festService.getFeaturedFest(), req.id));
});
