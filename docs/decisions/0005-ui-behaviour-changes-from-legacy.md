# 0005: UI behaviour that differs from the old pages

**Status:** accepted

## Context
Batch 4 rebuilt the navbar, footer, modal and loading states as React components. The look comes from the old stylesheets, but a few behaviours were changed on purpose.

## Changes
- **Footer links:** 3 duplicate links were removed ("INNOVATION LABS", "RESEARCH PAPERS", "TECH CONCLAVES" pointed to pages that already had their own link). Columns now hold 5 and 2 links.
- **Newsletter box:** shown but switched off, with "SIGN-UP OPENS SOON". The old form told people they were connected while storing nothing.
- **Footer text:** the heart emoji line is now "ENGINEERED FOR ENGINEERS".
- **Modal:** adds Escape and outside-click closing (as before) plus a focus trap, focus return, scroll lock and dialog labelling.
- **Navigation:** the active link comes from the router, and focus moves to the page content after each page change.
- **Social icons:** inline SVG instead of the Font Awesome font. Twitter keeps the old bird icon.

## Still open
- Companies and Contact are reachable from the footer but not from the top navbar, as in the old site.
- Hover prefetching warms up a page's code only (done in `routes/page-loaders.js`). The page's data is not prefetched yet.
- An offline banner (`OfflineBanner`) appears when the connection drops, which the old site did not have.
