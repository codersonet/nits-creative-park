# 0003: Placeholder data until the API exists

**Status:** accepted

## Context
The backend is not built yet, but the pages need content (clubs, alumni, partners, events, metrics). The content currently lives in the HTML and in `script.js`.

## Decision
- Frontend services call the API through `apiClient.js` (`/api/v1/...`).
- While `VITE_USE_MOCK_DATA=true`, each service returns data from `frontend/src/services/mocks/` instead. Every mock file starts with a header that says it is placeholder data.
- The contact form has no approved delivery endpoint, so `contact.service.js` is a labelled stub that never claims a message was sent.

## Consequences
- Pages, hooks and components are written against the final response shape (mandate Section 4), so switching to the real API means changing one env variable.
- Figures and names in the mocks are copied from the legacy pages and are not verified. They must be checked with the content owners before launch (see `contributing.md`).
- Placeholders are listed in the final Definition of Done report.
