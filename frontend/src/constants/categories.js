/**
 * categories.js
 * What:  The filter choices for the project list and the event list.
 * Used by: FilterBar, project and event hooks and services
 * Talks to: nothing
 */

// The "show everything" choice. Services skip the category filter when they get this value.
export const ALL_CATEGORY = 'all';

// "value" is what travels to the API (allow-listed). "label" is what the button shows.
export const PROJECT_CATEGORIES = Object.freeze([
  { value: ALL_CATEGORY, label: 'ALL_SYSTEMS' },
  { value: 'tech', label: 'CODING_&_AI' },
  { value: 'robotics', label: 'ROBOTICS_&_HW' },
  { value: 'creative', label: 'DESIGN_&_CULTURE' },
]);

export const EVENT_CATEGORIES = Object.freeze([
  { value: ALL_CATEGORY, label: 'ALL_SCHEDULE' },
  { value: 'tech', label: 'ABHIYANTRAN_TECH' },
  { value: 'hackathon', label: 'DEV_HACK' },
  { value: 'robotics', label: 'ROBO_TERRAIN' },
  { value: 'culture', label: 'UDGAM_CULTURE' },
  { value: 'sports', label: 'SPORTS_ESPORTS' },
]);
