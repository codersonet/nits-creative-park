# 0004: Self-hosted fonts and icons

**Status:** accepted

## Context
The old pages load Google Fonts and Font Awesome from CDNs. Mandate Section 8.3 asks for self-hosted, subset fonts, and Section 8.3 also warns against unused CSS libraries. The old site uses only 12 Font Awesome icons.

## Decision
- Fonts come from `@fontsource/space-grotesk` and `@fontsource/space-mono` (Latin subset, `font-display: swap`).
- Icons come from `react-icons` (Font Awesome 6 set), which bundles only the icons that are imported.
- The old CDN links are not used by the new frontend.

## Consequences
- No third-party requests block rendering, and the site works without reaching the CDNs.
- Legacy CSS rules that target `<i>` icon elements (for example `.social-icon i`) do not apply to SVG icons. The icon components add their own small styles (Batch 4).
- Preloading the main font file is not done yet, because the file names are hashed at build time. It is listed as an open item for the final report.
