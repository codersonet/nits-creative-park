# 0001: React + Vite frontend in `frontend/`

**Status:** accepted

## Context
The site is plain HTML, CSS and JavaScript with no build step. The owner plans to make it dynamic and to build a backend. The architecture mandate (Section 2) asks for separate `frontend/` and `backend/` projects, and its default frontend stack is React + Vite.

## Decision
Build the new frontend as a React + Vite app in `frontend/`, using React Router for pages and TanStack Query for cached data fetching (mandate Section 8.2).

## Consequences
- The project now has a build step. `contributing.md` allowed this only if the project is intentionally migrated, and this is that migration.
- GitHub Pages currently deploys the repository root. Deploying the new app means building `frontend/dist`. That workflow change is the owner's call and is not made here.
- Dependency versions are pinned in `frontend/package.json`. The lockfile must be created by running `npm install` once, because this environment has no network access.
