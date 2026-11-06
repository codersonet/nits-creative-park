/**
 * footer-links.js
 * What:  The two link columns in the footer.
 * Used by: components/layout/Footer
 * Talks to: routes.js
 */
import { ROUTES } from "./routes.js";

// WHY: the old footer had 10 links but 3 of them pointed to the same pages as other links
// ("INNOVATION LABS", "RESEARCH PAPERS", "TECH CONCLAVES"). They are dropped so each link is unique.
export const FOOTER_LINK_COLUMNS = Object.freeze([
  Object.freeze([
    { label: "OVERVIEW", path: ROUTES.HOME },
    { label: "CLUBS & PROJECTS", path: ROUTES.CLUBS },
    { label: "ALUMNI DIRECTORY", path: ROUTES.ALUMNI },
    { label: "CAMPUS METRICS", path: ROUTES.METRICS },
    { label: "EVENTS & KEYNOTES", path: ROUTES.EVENTS },
  ]),
  Object.freeze([
    { label: "RECRUITER LOGS", path: ROUTES.COMPANIES },
    { label: "CONTACT UPLINK", path: ROUTES.CONTACT },
  ]),
]);
