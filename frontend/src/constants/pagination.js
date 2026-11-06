/**
 * pagination.js
 * What:  Page-size rules shared by services and placeholder data.
 * Used by: services/*.service.js, services/mocks/mock-helpers.js
 * Talks to: nothing
 */

// How many items a list request asks for when the page does not say.
export const DEFAULT_PAGE_LIMIT = 50;

// The API's own maximum (100) is enforced by the backend and written in docs/api/openapi.yaml.
