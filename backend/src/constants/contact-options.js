/**
 * contact-options.js
 * What:  The allowed skills and subjects of a contact message, and the field size limits.
 * Used by: validators/contact.validator.js
 * Talks to: nothing. Must match frontend/src/constants/contact-options.js
 *           (scripts/check-contract.mjs checks that in CI).
 */
export const CONTACT_SKILLS = Object.freeze([
  "AUTONOMOUS_ROBOTICS",
  "AI_DISTRIBUTED_ML",
  "HIMALAYAN_IOT",
  "SPATIAL_COMPUTING",
  "FULLSTACK_SYSTEMS",
  "AEROSPACE_DRONES",
  "QUANTUM_FINTECH",
  "SEISMIC_CIVIL",
]);

export const CONTACT_SUBJECTS = Object.freeze([
  "PROJECT_COLLABORATION",
  "CAMPUS_RECRUITMENT",
  "RESEARCH_PARTNERSHIP",
  "ALUMNI_NETWORKING",
  "SYSTEM_FEEDBACK",
]);

export const CONTACT_LIMITS = Object.freeze({
  nameMax: 100,
  emailMax: 254,
  messageMax: 2000,
});
