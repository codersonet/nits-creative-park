# 0007: Backend stack and scope

**Status:** accepted

## Context
The owner asked for the backend to be built with the mandate's defaults, so the site can become dynamic. Section 15 of the mandate names Node.js with Express, PostgreSQL and Redis.

## Decision
- **Stack:** Node.js 22, Express 4, PostgreSQL 16 (plain SQL through `pg`, no ORM), Redis 7 (cache and shared rate-limit counters), pino logs.
- **Layers:** route, middleware, validator, controller, service, repository, database. Each layer has one job (see `README_ARCHITECTURE.md`, Section 2).
- **Validation is hand-written** (`src/utils/validation.js`) instead of using a validation library. The API has two small input shapes (list queries and the contact message), and plain code keeps the package list short and lets the checks run in any environment.
- **Scope today:** public read endpoints and one write endpoint (contact messages). There are **no accounts, no login and no admin API**, because the owner has not chosen an auth method (mandate Section 15 says "TBD"). Content is managed with SQL seed files and direct database edits until an admin area is designed.
- **Cache:** reads go through Redis with a 5-minute lifetime. If Redis is missing or down, the API still works, only slower.

## Consequences
- Content changes mean editing `backend/seeds/*.sql` (or the database) and clearing the cache (`docs/runbook.md`, section 5).
- Adding login and an admin area is the next big step and needs its own decision note (method, roles, sessions, audit log).
- The API's shape is fixed by `docs/api/openapi.yaml`, and `scripts/check-contract.mjs` checks that the frontend and backend agree on the shared values.
