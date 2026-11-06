/**
 * navigation.js
 * What:  The links shown in the top navigation bar.
 * Used by: components/layout/Navbar
 * Talks to: routes.js
 */
import { ROUTES } from './routes.js';

// WHY: the old site used "FESTS_&_EVENTS" on the homepage but "EVENTS" elsewhere.
// One label is used everywhere now.
export const NAV_LINKS = Object.freeze([
  { label: 'OVERVIEW', path: ROUTES.HOME },
  { label: 'CLUBS_&_PROJECTS', path: ROUTES.CLUBS },
  { label: 'ALUMNI_DIRECTORY', path: ROUTES.ALUMNI },
  { label: 'METRICS', path: ROUTES.METRICS },
  { label: 'FESTS_&_EVENTS', path: ROUTES.EVENTS },
]);
