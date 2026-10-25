# README_ARCHITECTURE.md
### Mandatory build rules for AI coding agents (DRAFT FOR REVIEW)

> **Agent: read this entire file before writing any code.**
> These rules apply to every web app or website you build in this project.
> If a rule conflicts with a user request, tell the user and ask. Do not silently skip a rule.

---

## 0. How to use this file

1. **Before coding**: reply with a short plan: the folder tree you will create, the stack, and which sections of this file apply.
2. **While coding**: follow Sections 1-9 on every file you write.
3. **Before saying "done"**: walk through Section 14 (Definition of Done) and report each item as done, not applicable (with a reason), or not done (with a reason).
4. **Never** claim a checklist item is done unless you actually implemented it.
5. If something is missing (hosting, database, budget), ask one clear question or pick a safe default and state it.

---

## 1. Non-negotiable principles

| # | Principle | Meaning |
|---|-----------|---------|
| 1 | **One file = one job** | Never mix routes, business logic, database queries and validation in one file. |
| 2 | **Frontend and backend are separate projects** | Separate folders, separate dependencies, talk only through the API. |
| 3 | **Easy comments everywhere** | Every file starts with a header comment. Comments explain *why*, in plain English. |
| 4 | **Security is a feature, not a phase** | Built in from the first commit. See Section 6. |
| 5 | **Stateless and scalable from day one** | Must run behind a load balancer with 2+ copies. See Section 7. |
| 6 | **Smooth by default** | Skeleton loaders, no layout jumps, fast transitions. See Section 8. |
| 7 | **No secrets in code** | Everything sensitive lives in environment variables. |
| 8 | **Fail gracefully** | Every loading, empty and error state is designed, never blank. |
| 9 | **Small files** | Target under 200 lines per file, hard limit 300. Split when bigger. |
| 10 | **No dead or fake code** | No placeholder logic pretending to work, no unused files, no leftover `console.log`. |

---

## 2. Project folder structure (monorepo)

Default stack below is an example (Node.js + React). If another stack is used, keep the **same layers and separation**.

```
project-root/
├── README.md                  # How to run the project (short)
├── README_ARCHITECTURE.md     # This file
├── .gitignore
├── .env.example               # Every variable listed, no real values
├── docker-compose.yml         # Runs everything locally (app, db, cache, proxy)
│
├── backend/
│   ├── package.json
│   ├── Dockerfile
│   ├── .env.example
│   └── src/
│       ├── server.js              # Starts the server only (listen, graceful shutdown)
│       ├── app.js                 # Builds the app (middleware + routes), no listen()
│       ├── config/                # Reads env vars, one file per concern
│       │   ├── env.js
│       │   ├── database.js
│       │   ├── cache.js
│       │   └── cors.js
│       ├── routes/                # URL -> controller mapping ONLY
│       │   ├── index.js
│       │   ├── auth.routes.js
│       │   └── user.routes.js
│       ├── controllers/           # Read request, call service, send response
│       │   ├── auth.controller.js
│       │   └── user.controller.js
│       ├── services/              # Business logic, no HTTP code in here
│       │   ├── auth.service.js
│       │   └── user.service.js
│       ├── repositories/          # Database queries ONLY
│       │   └── user.repository.js
│       ├── models/                # Data shapes / schemas
│       │   └── user.model.js
│       ├── validators/            # Input rules per endpoint
│       │   └── auth.validator.js
│       ├── middleware/            # Reusable request steps
│       │   ├── auth.middleware.js
│       │   ├── rateLimit.middleware.js
│       │   ├── validate.middleware.js
│       │   ├── error.middleware.js
│       │   ├── security.middleware.js
│       │   └── requestId.middleware.js
│       ├── jobs/                  # Background work (emails, cleanups)
│       ├── utils/                 # Tiny pure helpers (one purpose each)
│       ├── constants/             # Fixed values, error codes, roles
│       ├── errors/                # Custom error classes
│       └── logger/                # Logging setup
│   ├── migrations/            # Database changes, versioned
│   ├── seeds/                 # Sample / dev data
│   └── tests/
│       ├── unit/
│       ├── integration/
│       └── load/
│
├── frontend/
│   ├── package.json
│   ├── Dockerfile
│   ├── .env.example
│   └── src/
│       ├── main.jsx               # App entry only
│       ├── App.jsx                # Layout shell + router only
│       ├── pages/                 # One file per screen (thin, compose components)
│       ├── components/
│       │   ├── ui/                # Button, Input, Modal, Toast (generic, reusable)
│       │   ├── layout/            # Navbar, Sidebar, Footer
│       │   ├── skeletons/         # One skeleton per screen/component type
│       │   └── features/          # Feature-specific components, one folder each
│       ├── hooks/                 # Reusable logic (useAuth, useDebounce...)
│       ├── services/              # API calls ONLY (one file per resource)
│       │   ├── apiClient.js       # Base fetch/axios setup, interceptors
│       │   └── user.service.js
│       ├── store/                 # Global state, one slice per domain
│       ├── routes/                # Route definitions, protected-route wrapper
│       ├── styles/                # tokens.css, global.css, one css per component
│       ├── utils/                 # Pure helpers
│       ├── constants/
│       ├── assets/                # Images, fonts, icons (optimized)
│       └── tests/
│
├── infra/
│   ├── nginx/                 # Reverse proxy + load balancer config
│   ├── ci/                    # CI/CD pipeline files
│   └── monitoring/            # Alerts, dashboards config
│
├── docs/
│   ├── api/                   # OpenAPI/Swagger spec
│   ├── decisions/             # Short "why we chose X" notes
│   └── runbook.md             # What to do when it breaks
│
└── scripts/                   # Setup, backup, deploy helpers
```

### Layer rules (the most common place AI mixes things up)

| Layer | Allowed to do | Forbidden |
|-------|---------------|-----------|
| **routes** | Map URL + method to a controller, attach middleware | Logic, DB calls |
| **controllers** | Read request, call one service, return response | Business rules, DB calls |
| **services** | Business rules, combine repositories | `req`/`res` objects, SQL |
| **repositories** | Queries to the database | Business rules, HTTP |
| **validators** | Check and clean input | Anything else |
| **middleware** | Cross-cutting steps (auth, limits, logging) | Business rules |
| **frontend pages** | Compose components, fetch via hooks | Raw API calls, big UI blocks |
| **frontend services** | Call the API, return data | UI code |
| **components** | Render UI from props | API calls (use hooks) |

Request flow: `route -> middleware -> validator -> controller -> service -> repository -> database`

---

## 3. Commenting standard (keep it easy)

Write comments for a beginner reading the project in 6 months.

**Every file begins with a header:**
```js
/**
 * user.service.js
 * What:  Business logic for users (create, update, delete).
 * Used by: user.controller.js
 * Talks to: user.repository.js
 */
```

**Every function gets a one-to-three line comment:**
```js
// Creates a new user.
// Hashes the password first. Never store plain passwords.
// Returns the user without the password field.
async function createUser(data) { ... }
```

**Rules**
- Explain *why*, not what the next line obviously does.
- Plain words, short sentences, no jargon without a hint.
- Mark non-obvious decisions: `// WHY: ...`
- Mark security-sensitive code: `// SECURITY: ...`
- Mark performance-sensitive code: `// PERF: ...`
- Use `// TODO(name): ...` only with a reason, and list open TODOs in the final report.
- Never leave commented-out old code. Delete it.

**Naming**
- Files: `kebab-case` or `name.type.js` (`user.service.js`).
- Functions say what they do: `getUserById`, not `process`.
- Booleans start with `is/has/can`.
- No single-letter names except short loops.

---

## 4. API design rules

- [ ] All endpoints under a version prefix: `/api/v1/...`
- [ ] REST naming: nouns, plural (`/users`, `/orders/:id`)
- [ ] Correct status codes (200, 201, 204, 400, 401, 403, 404, 409, 422, 429, 500)
- [ ] One consistent response shape:
  ```json
  { "success": true, "data": {}, "error": null, "requestId": "abc123" }
  ```
  ```json
  { "success": false, "data": null, "error": { "code": "VALIDATION_ERROR", "message": "Email is invalid" }, "requestId": "abc123" }
  ```
- [ ] Pagination on every list endpoint (default limit, max limit)
- [ ] Filtering and sorting through query params, allow-listed
- [ ] Idempotency for payment-like or retry-prone POSTs
- [ ] Never return internal errors, stack traces, or database messages to the client
- [ ] OpenAPI/Swagger spec kept in `docs/api/`
- [ ] Health endpoints: `/health` (alive) and `/ready` (dependencies OK)

---

## 5. Data and database rules

- [ ] Schema changes only through **migrations** (never edit the live DB by hand)
- [ ] Indexes on every column used in `WHERE`, `JOIN`, `ORDER BY`
- [ ] Foreign keys and constraints enforced in the database, not just in code
- [ ] Parameterized queries or an ORM only. No string-built SQL.
- [ ] Transactions for multi-step writes
- [ ] Connection pooling configured with sane limits
- [ ] No `SELECT *` in production code
- [ ] N+1 queries avoided (batch or join)
- [ ] `created_at`, `updated_at` on every table; soft delete where history matters
- [ ] Automated backups + a tested restore procedure
- [ ] Seed data for development only, never auto-run in production
- [ ] Sensitive fields encrypted at rest where required (tokens, personal data)

---

## 6. Security (HIGH PRIORITY - the part AI usually skips)

### 6.1 Authentication and sessions
- [ ] Passwords hashed with **bcrypt or argon2** (never MD5/SHA1/plain)
- [ ] Minimum password rules + check against common-password list
- [ ] Access tokens short-lived (about 15 min) + refresh tokens rotated and revocable
- [ ] Tokens in **HttpOnly, Secure, SameSite** cookies (not `localStorage`)
- [ ] Login brute-force protection: rate limit + temporary lockout
- [ ] Password reset: single-use, expiring tokens; same response whether the email exists or not
- [ ] Email verification before sensitive actions
- [ ] Optional 2FA for admin accounts
- [ ] Logout really invalidates the session server-side

### 6.2 Authorization
- [ ] Role-based access control (RBAC) enforced **on the server** for every route
- [ ] **Ownership checks** on every resource (a user must not read or edit another user's `/orders/:id`). This is IDOR, the most common AI-generated hole.
- [ ] Deny by default: routes are protected unless explicitly public
- [ ] Admin endpoints separated and extra-protected

### 6.3 Input and output
- [ ] **Validate every input** on the server (body, params, query, headers, file metadata) with an allow-list schema
- [ ] Reject unknown fields (stop mass assignment)
- [ ] Sanitize output; never inject raw HTML (stop XSS). Escape by default.
- [ ] Parameterized queries (stop SQL/NoSQL injection)
- [ ] Limit body size and JSON depth
- [ ] File uploads: check type by content not extension, limit size, random file names, store outside web root or in object storage, scan if possible
- [ ] Block SSRF: never fetch user-supplied URLs without an allow-list
- [ ] Safe redirects only (allow-list), no open redirects

### 6.4 Browser and transport
- [ ] HTTPS everywhere, HSTS on, HTTP redirects to HTTPS
- [ ] Security headers (Helmet or equivalent): CSP, X-Content-Type-Options, X-Frame-Options/frame-ancestors, Referrer-Policy, Permissions-Policy
- [ ] **CORS** with an explicit allow-list of origins (never `*` with credentials)
- [ ] **CSRF** protection for cookie-based auth
- [ ] Cookies: `HttpOnly; Secure; SameSite=Lax/Strict`

### 6.5 Abuse protection
- [ ] **Rate limiting** per IP and per user, stricter on login, signup, password reset, search, and anything that sends email/SMS
- [ ] CAPTCHA or similar on public forms
- [ ] Request timeouts and payload limits
- [ ] Bot/scraper protection at the edge where relevant

### 6.6 Secrets and configuration
- [ ] No keys, passwords or tokens in code or git history
- [ ] `.env` in `.gitignore`; `.env.example` committed with fake values
- [ ] App **refuses to start** if a required secret is missing
- [ ] Different secrets for dev, staging, production
- [ ] Secret rotation plan; use a secret manager in production
- [ ] Least-privilege database user (the app cannot drop tables)

### 6.7 Dependencies and supply chain
- [ ] Lockfile committed; pinned versions
- [ ] `npm audit` (or equivalent) in CI, fails on high severity
- [ ] Only well-maintained packages; remove unused ones
- [ ] Automated dependency updates

### 6.8 Logging and privacy
- [ ] Never log passwords, tokens, card data or full personal data
- [ ] Audit log for sensitive actions (login, role change, delete, payment)
- [ ] Error messages to users are generic; details only in server logs
- [ ] Privacy policy, terms, cookie consent, data deletion/export path (GDPR/DPDP-style readiness)

---

## 7. Load balancing and scalability (HIGH PRIORITY)

Design as if 2+ copies of the backend will run at once from the first day.

### 7.1 Make the app stateless
- [ ] No user sessions in server memory; use **Redis** (or signed tokens)
- [ ] No files saved on the app server's disk; use object storage (S3-compatible)
- [ ] No in-memory caches that must be shared; use Redis
- [ ] No cron/background jobs running inside every instance; use a queue worker or one scheduler
- [ ] Config only through environment variables

### 7.2 Load balancer and proxy
- [ ] Reverse proxy / load balancer in front (Nginx, Caddy, HAProxy, or the cloud's managed LB)
- [ ] At least 2 backend instances in the compose/deploy config
- [ ] Algorithm chosen and documented (round-robin or least-connections; avoid sticky sessions)
- [ ] **Health checks** (`/health`, `/ready`) so the balancer removes sick instances
- [ ] TLS terminated at the proxy; trusted-proxy setting configured so real client IPs are seen
- [ ] Proxy-level rate limits, gzip/brotli compression, request size limits
- [ ] Static frontend files served from a **CDN** with long cache headers (hashed file names)
- [ ] Zero-downtime deploys (rolling or blue/green)

### 7.3 Backend resilience
- [ ] **Graceful shutdown**: stop accepting requests, finish current ones, close DB connections
- [ ] Timeouts on every outgoing call (DB, APIs); retries with backoff; circuit breaker for flaky services
- [ ] Queue (Redis/RabbitMQ/SQS) for slow work: emails, image processing, reports
- [ ] Caching strategy: HTTP cache headers, Redis for hot reads, clear invalidation rules
- [ ] DB connection pool sized for the number of instances (instances x pool must stay under the DB limit)
- [ ] Read replicas or caching plan for read-heavy loads
- [ ] Backpressure: return 429/503 with `Retry-After` instead of crashing
- [ ] Horizontal autoscaling plan on CPU/requests

### 7.4 Prove it
- [ ] Load test script in `backend/tests/load/` (k6 or similar) with target numbers
- [ ] Test that killing one instance causes no user-visible failure

---

## 8. Frontend smoothness and UX quality (HIGH PRIORITY)

### 8.1 Loading experience
- [ ] **Skeleton loaders** for every screen and data block that waits on the network. Skeleton must match the final layout size so nothing jumps.
- [ ] Skeleton files live in `components/skeletons/`, one per content type
- [ ] Subtle shimmer animation, disabled when `prefers-reduced-motion` is on
- [ ] Never show a blank white screen or a lone spinner for more than 300 ms
- [ ] Spinners only for short button actions; skeletons for page content
- [ ] **Empty states** (friendly message + next action) and **error states** (what happened + retry button) for every list and page
- [ ] Route-level code splitting and lazy loading with the skeleton as the fallback
- [ ] **Error boundary** so one broken component never blanks the whole app

### 8.2 Perceived speed
- [ ] **Optimistic updates** for likes, toggles, small edits, with rollback on failure
- [ ] Prefetch the next likely route/data on hover or when idle
- [ ] Debounce search and resize handlers; throttle scroll handlers
- [ ] Virtualize long lists (hundreds of rows+)
- [ ] Cache API responses on the client (React Query/SWR style) with stale-while-revalidate
- [ ] Cancel outdated requests when inputs change

### 8.3 Core Web Vitals targets
| Metric | Target |
|--------|--------|
| LCP (main content visible) | under 2.5 s |
| INP (interaction response) | under 200 ms |
| CLS (layout shift) | under 0.1 |
| Initial JS bundle | as small as possible; flag anything over ~200 KB gzipped |

- [ ] Images: modern formats (WebP/AVIF), correct sizes, `width`/`height` set, lazy-load below the fold, responsive `srcset`
- [ ] Fonts: self-hosted, `font-display: swap`, subset, preload the main one
- [ ] Critical CSS small; no unused CSS libraries
- [ ] Animate only `transform` and `opacity` (GPU-friendly), never layout properties
- [ ] Transitions: 150-300 ms, ease-out; page changes fade/slide softly
- [ ] No render-blocking third-party scripts; load analytics late

### 8.4 Interaction polish
- [ ] Buttons show loading + disabled state during actions (prevents double-submit)
- [ ] Forms: inline validation, clear messages, keep user input on error
- [ ] Toasts for success/failure, not alerts
- [ ] Focus management on modals and route changes
- [ ] Offline/slow-network message when the API is unreachable

### 8.5 Accessibility, SEO, devices
- [ ] Semantic HTML, labels on inputs, `aria-label` on icon buttons, alt text
- [ ] Keyboard navigable, visible focus ring, contrast 4.5:1 or better
- [ ] Respect `prefers-reduced-motion` and `prefers-color-scheme`
- [ ] Mobile-first responsive layout; touch targets 44 px+
- [ ] SEO: title, meta description, Open Graph tags, `sitemap.xml`, `robots.txt`, clean URLs, server rendering or prerendering where SEO matters
- [ ] Favicon and web manifest; custom 404 and 500 pages

---

## 9. Error handling, logging, monitoring

- [ ] One central error handler (`error.middleware.js`); controllers do not each invent their own
- [ ] Custom error classes (`NotFoundError`, `ValidationError`, `AuthError`)
- [ ] Unhandled rejections and uncaught exceptions are caught, logged, then the process exits cleanly so it restarts
- [ ] Structured JSON logs with level, timestamp and **request ID** on every line
- [ ] Request ID created at the edge, passed through to the logs and the response
- [ ] Frontend error reporting (e.g. Sentry) with source maps kept private
- [ ] Uptime monitoring + alerts (errors, latency, CPU/memory, DB connections, queue backlog)
- [ ] Metrics endpoint or dashboard for response time and error rate

---

## 10. Testing

- [ ] **Unit tests** for services and utils
- [ ] **Integration tests** for routes with a test database
- [ ] **End-to-end tests** for the key user flows (sign up, login, main task, logout)
- [ ] **Security tests**: auth bypass, IDOR, rate limit, invalid input
- [ ] **Load test** (Section 7.4)
- [ ] Tests run in CI on every push; merging blocked on failure
- [ ] Linter + formatter enforced (ESLint/Prettier or equivalent)

---

## 11. DevOps and delivery

- [ ] `Dockerfile` for backend and frontend (multi-stage, non-root user, small image)
- [ ] `docker-compose.yml` starts the full stack with one command
- [ ] Environments: local, staging, production, with separate configs and secrets
- [ ] **CI/CD pipeline**: install, lint, test, audit, build, deploy
- [ ] Database migrations run as a controlled deploy step
- [ ] One-command rollback to the previous version
- [ ] Infrastructure described as code where possible
- [ ] Automated backups verified by a restore drill
- [ ] Domain, DNS, TLS certificate auto-renewal
- [ ] Cost alerts on cloud spend

---

## 12. Product-ready website/app checklist (master list)

**Foundation**
- [ ] Clear folder structure per Section 2
- [ ] README with setup steps that actually work on a clean machine
- [ ] `.env.example` complete

**Users and access**
- [ ] Sign up, login, logout, forgot/reset password, email verification
- [ ] Profile and account settings, delete account
- [ ] Roles and permissions

**Core experience**
- [ ] Skeleton, empty, error and success states everywhere
- [ ] Responsive on phone, tablet, desktop
- [ ] Dark/light theme if the design calls for it
- [ ] Notifications (in-app and/or email) with preferences

**Content and pages**
- [ ] Landing/home, main app screens, 404, 500, maintenance page
- [ ] Legal: privacy policy, terms, cookie consent
- [ ] Contact / support path

**Performance and scale**
- [ ] Section 7 and Section 8 completed
- [ ] CDN, caching, compression on

**Security**
- [ ] Section 6 completed, with a final pass using the OWASP Top 10 as a checklist

**Operations**
- [ ] Logging, monitoring, alerts, backups, runbook
- [ ] Analytics and basic event tracking (privacy-respecting)
- [ ] Admin tools or a safe way to support users

**Quality**
- [ ] Tests passing, CI green, linter clean
- [ ] Accessibility check (keyboard + screen reader basics)
- [ ] Cross-browser check (Chrome, Safari, Firefox, mobile browsers)

**Launch**
- [ ] Production env vars set, debug off, source maps private
- [ ] DNS + HTTPS verified, redirects (www/non-www) correct
- [ ] Smoke test on production after deploy
- [ ] Rollback plan ready
- [ ] Post-launch monitoring watched for the first 24-48 hours

---

## 13. Flaws AI agents commonly make (do NOT do these)

| Common flaw | Required behavior |
|-------------|-------------------|
| One giant `index.js` / `App.jsx` / `server.js` | Split by layer, Section 2 |
| Logic inside routes or components | Move to services/hooks |
| Frontend and backend mixed in one folder | Separate top-level folders |
| Secrets hard-coded or committed | Env vars + startup check |
| No input validation | Validator on every endpoint |
| Auth added but ownership never checked (IDOR) | Check owner on every resource |
| JWT in `localStorage` | HttpOnly cookies |
| `cors({ origin: "*" })` | Explicit origin allow-list |
| No rate limiting | Per-IP and per-user limits |
| Sessions/files/cache stored on the app server | Stateless design, Redis, object storage |
| No load balancer, health checks, or graceful shutdown | Section 7 |
| Spinner or blank screen while loading | Skeleton loaders matching layout |
| Layout jumps when images/data arrive | Reserve space, set dimensions |
| No empty/error states | Design all states |
| Giant unoptimized images and bundles | Compression, lazy load, code split |
| `SELECT *`, no indexes, N+1 queries | Indexes, selective queries, batching |
| No pagination | Pagination on all lists |
| Raw error messages sent to users | Generic message + request ID |
| `console.log` everywhere | Structured logger |
| No tests | Unit, integration, e2e, load |
| No migrations, DB edited manually | Versioned migrations |
| Outdated or unused dependencies | Audit, prune, pin |
| Pretending something works (fake data, stub auth) | Say clearly what is a placeholder |
| Skipping accessibility and SEO | Section 8.5 |
| Declaring "done" without checking | Report against Section 14 |

---

## 14. Definition of Done (agent must report this at the end)

Reply with a table. Mark every row **Done**, **N/A (reason)**, or **Not done (reason)**:

| Area | Status | Notes |
|------|--------|-------|
| Folder structure and file separation (Section 2) | | |
| Comments and naming (Section 3) | | |
| API rules (Section 4) | | |
| Database rules (Section 5) | | |
| Security (Section 6) | | |
| Load balancing and scalability (Section 7) | | |
| Smoothness, skeletons, performance (Section 8) | | |
| Errors, logging, monitoring (Section 9) | | |
| Tests (Section 10) | | |
| DevOps (Section 11) | | |
| Product-ready checklist (Section 12) | | |

Also list: placeholders still in the code, open TODOs, known risks, and the exact commands to run, test and deploy.

---

## 15. Project-specific settings (fill in per project)

```
Project name:         NIT Sikkim Creative Park (repo: codersonet/nitsikkim-creatives)
Type:                 Campus showcase website, static today, becoming a dynamic web app
Frontend stack:       React + Vite (default), React Router, TanStack Query
Backend stack:        Not started. The owner will build it. (default when started: Node.js + Express)
Database:             Not started (default when started: PostgreSQL)
Cache / queue:        Not started (default when started: Redis)
Hosting / cloud:      Today: GitHub Pages (https://codersonet.github.io/nitsikkim-creatives/). Dynamic phase: TBD by owner
Load balancer:        Not applicable until the backend exists (default then: Nginx)
Expected users:       TBD by owner
Auth method:          TBD by owner (public pages need none today)
Design style:         Existing dark glass design system in styles.css, reused through the @legacy alias
Compliance needs:     TBD by owner (India-based, so DPDP is likely relevant once forms store data)
Budget limits:        TBD by owner
```

---

## 16. This project's file map and connections

### 16.1 Scope and ownership

- **Now:** frontend only, built in `frontend/` following Sections 1-14.
- **Later:** `backend/`, `migrations/`, `seeds/` and the server-side rules in Sections 4-7 are owned by the project owner. Until the backend exists, those rows are reported **N/A (backend not started)** in Section 14, never "Done".
- **Legacy files are frozen.** Nothing in the original static site is edited. New files connect to old ones by file path (16.4). See `docs/decisions/0002-legacy-files-frozen.md`.

### 16.2 Legacy files (frozen) and where each one is connected

| Legacy file | Role today | Connected to (new location) |
|-------------|-----------|-----------------------------|
| `index.html` | Landing page | `frontend/src/pages/HomePage.jsx` |
| `pages/clubs.html` | Clubs and project cards, modal | `ClubsPage.jsx`, `ProjectCard`, `ProjectModal`, `FilterBar`, `project.service.js` |
| `pages/alumni.html` | Alumni directory | `AlumniPage.jsx`, `alumni.service.js` |
| `pages/companies.html` | Recruitment partners, marquee | `CompaniesPage.jsx`, `Marquee`, `company.service.js`, `placement.service.js` |
| `pages/events.html` | Fests, event filters | `EventsPage.jsx`, `FestHero`, `EventCard`, `event.service.js`, `fest.service.js`, `competency.service.js` |
| `pages/metrics.html` | Campus metrics | `MetricsPage.jsx`, `metrics.service.js` |
| `pages/contact.html` | Contact form (demo) | `ContactPage.jsx`, `contact.service.js` (placeholder until the API exists) |
| `script.js` | All shared behavior and project data | Split by job: `MountainCanvas`, `useCardTilt`, `useCountUp`, `Marquee`, `ProjectModal`, `Navbar`, `Footer`; data moves to `services/mocks/` (placeholder files) |
| `styles.css` | Tokens, layout, shared components | Imported by `frontend/src/styles/global.css` through `@legacy/styles.css` |
| `stylesheets/*.css` | One stylesheet per page | Imported by the matching page file through `@legacy/stylesheets/<page>.css` |
| `CreativeParkPreview.jsx` | Optional React example | Superseded by `ProjectCard`; the example file stays as is |
| `udgam2k26.png` | Fest poster (1.9 MB PNG) | Optimized WebP copy in `frontend/src/assets/images/`; original untouched |
| `favicon.svg`, `social-preview.svg` | Not uploaded | New placeholders in `frontend/public/`, replaced by the owner's real files |
| `.github/workflows/static.yml` | Not uploaded; deploys repo root | New workflow files in `infra/ci/`; switching Pages to deploy `frontend/dist` is the owner's decision |
| `docs/*.md`, `README.md`, `LICENSE`, `LICENSE_1` | Documentation and licence | Untouched. New docs go in `docs/decisions/`, `docs/api/`, `docs/runbook.md` |

### 16.3 New request flow (frontend, Section 2 applied)

`page -> hook -> service -> apiClient -> /api/v1/... (backend, later)`

- Pages compose components and call hooks only.
- Hooks (`useProjects`, `useEvents`, ...) wrap TanStack Query and call one service each.
- Services call `apiClient.js` and return plain data. While `VITE_USE_MOCK_DATA=true` they return labelled placeholder data from `services/mocks/` instead. See `docs/decisions/0003-placeholder-data-until-api.md`.
- Going dynamic means setting `VITE_USE_MOCK_DATA=false` once the backend serves the same response shape (Section 4).

### 16.4 How old files are linked without editing them

- `frontend/vite.config.js` defines the alias `@legacy` pointing at the repository root and allows the dev server to read it.
- Legacy CSS is imported by path (`@legacy/styles.css`, `@legacy/stylesheets/clubs.css`). Legacy rules key off `<body class="page-clubs">`, so `usePageClass` sets that class on each route.
- `VITE_BASE_PATH` and the router basename use the GitHub Pages subpath, so links no longer depend on `<base href>`.

### 16.5 Batch status

| Batch | Contents | Status |
|-------|----------|--------|
| 1 | This file, decision notes, `.gitignore`, `.env.example` | Done |
| 2 | Frontend scaffold and config | Done |
| 3a | Placeholder data, constants, optimized poster | Done |
| 3b | Services, API client, hooks, utils | Done |
| 4 | UI, layout and skeleton components | Done |
| 5 | Feature components | Done |
| 6 | Pages, routes, entry files | Done |
| 7 | Infra, CI, tests, API spec, runbook | Done |
| 8 | Definition of Done report | Not started |

---

*End of mandate. If any rule cannot be followed, stop and tell the user why before continuing.*
