# infra/ci

GitHub only runs pipelines that live in `.github/workflows/`, so the pipeline files are there and not in this folder. This note says what each one does.

| File | When it runs | What it does |
|------|--------------|--------------|
| `.github/workflows/ci.yml` | Every pull request and every push to `main` | Frontend: lint, format, tests, build, audit. Backend: lint, format, unit and integration tests against a real PostgreSQL, audit. Contract check. Builds both Docker images. |
| `.github/workflows/deploy-pages.yml` | Started by hand | Builds the frontend and publishes it to GitHub Pages (placeholder-data mode, because Pages cannot run the API). |
| `.github/dependabot.yml` | Weekly | Opens pull requests for new package and GitHub Action versions. |

## Make CI block bad changes

CI only reports. To stop a broken change from being merged, turn on branch protection for `main` in GitHub (Settings, Branches) and require these checks: `frontend`, `backend`, `contract`, `docker`. Only a repository owner can do this.

## Deploying the full stack

The full stack (site, API, database, cache) runs from `docker-compose.yml` on a server that can run containers. `scripts/deploy.sh` builds, migrates, starts and smoke-tests it. See `docs/runbook.md`, section 6.
