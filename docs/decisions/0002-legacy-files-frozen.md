# 0002: Legacy static files stay untouched

**Status:** accepted

## Context
The owner asked that no pre-existing file is changed while the project is reshuffled. New files must connect to old ones by file path.

## Decision
- The original pages, `script.js`, `styles.css`, `stylesheets/` and docs are not edited.
- `frontend/vite.config.js` defines an `@legacy` alias to the repository root. New code imports legacy CSS through it.
- `docs/file-map` information lives in `README_ARCHITECTURE.md`, Section 16.

## Consequences
- The old site keeps working exactly as before while the new frontend is built.
- Legacy page stylesheets are global and several rules are duplicated between them. Each page sets its `page-*` body class (`usePageClass`) so the scoped rules still apply.
- Legacy CSS stays loaded after navigating away from a page. This is acceptable because the shared selectors are identical.
- When the owner is ready to retire the old files, that is a separate, deliberate step.
