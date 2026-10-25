/**
 * env.js
 * What:  Reads the Vite environment variables once and exposes them as plain constants.
 * Used by: apiClient.js, services, the SEO component, the router
 * Talks to: nothing (only import.meta.env)
 */

// Removes trailing slashes so paths can be added after the value safely.
function trimTrailingSlash(value) {
  return value.replace(/\/+$/, '');
}

// Reads a true/false setting. Only the text "false" turns it off.
// WHY: when the setting is missing we fall back to placeholder data, so the site never
// fires requests at a backend that does not exist yet.
function readFlag(value, fallback) {
  if (value === undefined || value === '') return fallback;
  return value !== 'false';
}

// Public address of the site, used to build canonical and social links.
export const SITE_URL = trimTrailingSlash(import.meta.env.VITE_SITE_URL ?? '');

// Folder the site is served from. Vite fills this from VITE_BASE_PATH (always ends with "/").
export const BASE_PATH = import.meta.env.BASE_URL;

// Start of every API address, for example "/api/v1".
export const API_BASE_URL = trimTrailingSlash(import.meta.env.VITE_API_BASE_URL ?? '/api/v1');

// true while the backend is not built: services return labelled placeholder data.
export const USE_MOCK_DATA = readFlag(import.meta.env.VITE_USE_MOCK_DATA, true);
