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
- Hover prefetching of page data (mandate Section 8.2) is added with the router in Batch 6.
- `Layout` does not yet include the animated mountain background. It is added in Batch 5 when that component exists.
