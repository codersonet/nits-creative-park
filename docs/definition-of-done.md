# Definition of Done report

Report required by `README_ARCHITECTURE.md`, Section 14. Scope: the **frontend** (`frontend/`) and the files around it. The backend is not built yet and belongs to the project owner, so its rows say N/A.

**Read this first:** nothing in this package has been installed, built, linted or run, because the environment that produced it had no network. What was checked: JS/JSX syntax, YAML syntax, every import path, comment coverage, unused code, file sizes, and the logic of the utils, API client and services (in plain Node). The tests, lint, build, Docker image and a visual check are for you to run (see "Commands").

## Status table

| Area | Status | Notes |
|------|--------|-------|
| Folder structure and file separation (Section 2) | **Done** (frontend). **N/A** (backend) | Layers are separate: page → feature component → hook → service → `apiClient`. No `store/` folder, because nothing needs global state (an empty folder would be dead structure). `backend/`, `migrations/`, `seeds/` and `scripts/` are not created: the owner builds the backend. CI files live in `.github/workflows/`. Old files are untouched and linked through the `@legacy` alias. |
| Comments and naming (Section 3) | **Done** | A header comment on every JS, JSX, CSS, HTML and config file (JSON cannot hold comments). Every function has a comment above it (checked by script). Every source file is under 200 lines. |
| API rules (Section 4) | **Done** (frontend side). **N/A** (server side) | Frontend reads the standard envelope, supports pagination, shows request IDs, never shows raw error text. The contract is `docs/api/openapi.yaml`, checked against every route the services call. The backend does not exist, so the contract is untested against a real server. |
| Database rules (Section 5) | **N/A** (no database yet) | Owner's backend phase. |
| Security (Section 6) | **Partly done** | Done: no secrets in code, `.env.example` complete, `.gitignore`, external links use `rel="noopener noreferrer"`, no raw HTML injection, input length limits, CSP and security headers in `infra/nginx/frontend.conf`, `npm audit` in CI, Dependabot. **Not done:** `package-lock.json` (needs `npm install`); privacy policy, terms and cookie notice pages; CAPTCHA on the contact form (add with the backend). **N/A until the backend exists:** login, authorization/IDOR, CORS, CSRF, rate limits, server validation, audit logs. Note: GitHub Pages cannot set response headers, so the CSP only applies when served by the Nginx container. |
| Load balancing and scalability (Section 7) | **N/A** (backend). **Partly done** (frontend delivery) | Done: fingerprinted files cached for a year, gzip, `/healthz` for the container. **Not done:** load balancer, 2+ instances, CDN of our own (GitHub Pages' CDN is the only one), zero-downtime deploy, load test. All belong to the backend phase. |
| Smoothness, skeletons, performance (Section 8) | **Partly done** | Done: skeletons per content type sized like the real cards, empty and error states with retry, error boundary, code splitting with a skeleton fallback, cached data with refresh in the background, cancelled stale requests, hover prefetch of page code, WebP posters with `srcset` and dimensions, self-hosted fonts with `font-display: swap`, reduced-motion support, focus moved after page changes, modal focus trap, accessibility lint rules, titles/descriptions/canonical/Open Graph per page, `sitemap.xml`, `robots.txt`, manifest, custom 404, offline banner. **Not done:** toasts (no action needs one yet), data prefetch, font preload, measured bundle size and Web Vitals, 44 px touch-target and 4.5:1 contrast checks (the old CSS may fall short, e.g. filter buttons), prerendering (see risks). **N/A:** optimistic updates, virtual lists (no such features). The old CSS still animates `width` and `box-shadow`. |
| Errors, logging, monitoring (Section 9) | **Partly done** | Done: one `ApiError` type, error boundary at app and page level, unexpected error text hidden from visitors. **Not done:** frontend error reporting (e.g. Sentry), uptime monitoring and alerts, structured frontend logging (`console.error` is used in one place). Backend items are N/A. |
| Tests (Section 10) | **Partly done** | Written, not run: 9 test files covering date and text formatters, error rules, API client (URLs, envelope, offline, cancel, timeout), placeholder-data integrity, services, basic UI parts, and the contact form's honest offline state. Lint and format are enforced in CI. **Not done:** end-to-end tests. **N/A:** integration, security and load tests (backend). Blocking merges on a failed CI needs a GitHub branch-protection setting only the owner can turn on. |
| DevOps (Section 11) | **Partly done** | Done (written, not run): multi-stage non-root `frontend/Dockerfile`, `docker-compose.yml`, `ci.yml` (install, lint, format, test, build, audit), manual `deploy-pages.yml`, Dependabot. **Not done:** separate staging and production setups, one-command rollback (workaround: run the deploy workflow on an older commit), cost alerts. **N/A:** migrations, backups, infrastructure as code (backend phase). |
| Product-ready checklist (Section 12) | **Partly done** | Done: responsive layouts (from the old CSS), skeleton/empty/error states, 404 and error pages, contact path (social links; form is offline), `.env.example`, runbook, CI. **Not done:** maintenance page, legal pages and cookie consent, analytics, manual keyboard and screen-reader check, cross-browser check, smoke test on production, rollback plan beyond the workaround above. **N/A:** accounts, roles, notifications, admin tools (not part of this site yet). `README.md` at the root was left as it is, as agreed; the new setup steps are in `docs/runbook.md`. |

## Placeholders still in the code

1. All content in `frontend/src/services/mocks/` (projects, alumni, partners, placement figures, fests, events, competencies, metrics). Copied from the old pages and **not verified**. Alumni LinkedIn links and partner names look especially unverified.
2. The contact form is switched off while `VITE_USE_MOCK_DATA=true`. It shows "OFFLINE" and never claims to send.
3. The newsletter box in the footer is disabled ("SIGN-UP OPENS SOON").
4. Event buttons show "COMING_SOON" because no event has a real link yet.
5. `frontend/public/favicon.svg` and `social-preview.png` are generated stand-ins. Replace them with the real logo and share picture.
6. Company logos are the generic shapes from the old page, not real logos.
7. Three fest and three contact pictures load from Unsplash (a third-party site). The Atheleta picture has no image because its old link was a web page, not an image.
8. `sitemap.xml`, `robots.txt` and `404.html` contain the GitHub Pages address and path.

## Open TODOs

- Create `package-lock.json`, run `npm audit`, update old versions.
- Run `npm run format`, `npm run lint`, `npm test`, fix what they report.
- Check the pages in a browser at phone and desktop widths (spacing, animations, touch-target size, contrast).
- Verify the content with the content owners (see `contributing.md`) and resolve: Udgam listed as February/winter but the 2026 poster says 30 Oct – 1 Nov; PX4 listed twice in one project's stack; "Atheleta" spelling; Innoventure has no event filter, so its Explore button is hidden.
- Decide the fate of the old files and the old `static.yml` (see `docs/runbook.md`, section 5).
- Write legal pages (privacy policy, terms, cookie notice) before the contact form stores anything.
- Add Sentry-style error reporting, uptime monitoring and analytics.
- Replace third-party pictures with self-hosted, optimized ones.
- Add data prefetch, font preload, and measure bundle size and Web Vitals.
- Build the backend to `docs/api/openapi.yaml`, then turn `VITE_USE_MOCK_DATA` off.

## Known risks

- **Unrun package.** The first install, lint, test or build may show errors I could not see. The package versions were pinned from memory and are more than a year old.
- **Search and share previews.** Pages are drawn in the browser. Google runs the page's JavaScript, but social sites (WhatsApp, LinkedIn, X) read only `index.html`, so every shared link shows the home page's title and picture. Fix with prerendering or by hosting behind a server that fills these tags.
- **Old CSS is global.** Page stylesheets stay loaded after you leave a page. Their shared rules are identical, so effects should be small, but check pages for odd leftovers.
- **Old links.** `pages/*.html` redirects work only once the React build is what is published.
- **Two deploy workflows.** `static.yml` (old, publishes the repository root) and `deploy-pages.yml` (new, manual) must not both run automatically.
- **Unverified hardening.** The compose file makes the container read-only. If it will not start, remove `read_only` and `tmpfs` first.
- **CSP.** `style-src 'unsafe-inline'` is needed for the progress bars' inline widths. `img-src` allows Unsplash.

## Commands

Run inside `frontend/` unless noted.

| Goal | Command |
|------|---------|
| Install and create the lockfile | `npm install` |
| Check packages | `npm audit` |
| Format once | `npm run format` |
| Run locally | `npm run dev` (open the URL shown, plus the base path from `VITE_BASE_PATH`) |
| Test | `npm test` |
| Lint | `npm run lint` |
| Build | `npm run build` (needs `VITE_SITE_URL`) |
| Preview the build | `npm run preview` |
| Run in Docker (repository root) | `docker compose up --build`, then open `http://localhost:8080` |
| Deploy to GitHub Pages | Actions tab → "Deploy frontend to GitHub Pages" → Run workflow (see `docs/runbook.md`, section 5) |
