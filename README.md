# NIT Sikkim Creative Park

A campus showcase for NIT Sikkim: clubs and projects, events and fests, alumni, recruitment partners and campus metrics. It started as a static website and is now a full web app: a React frontend, a Node.js API, a PostgreSQL database and a Redis cache.

> The original static site (`index.html`, `pages/`, `styles.css`, `script.js`) is still in this repository, untouched. Its old README is saved as [`docs/legacy-readme.md`](docs/legacy-readme.md).

## Run it (Docker, about 5 minutes)

You need Docker with Compose, and the `package-lock.json` files (see [first-time setup](docs/runbook.md#1-first-time-setup)).

```bash
cp .env.example .env            # then set POSTGRES_PASSWORD and REDIS_PASSWORD
docker compose up --build       # starts database, cache, API and site
docker compose run --rm migrate node seeds/seed.js   # loads the starter content, once
scripts/smoke-test.sh           # checks that everything answers
# if a script says "permission denied":  chmod +x scripts/*.sh
```

Open <http://localhost:8080>.

## What is where

| Folder | What it holds |
|--------|---------------|
| `frontend/` | The React site (pages, components, hooks, services that call the API) |
| `backend/` | The API: routes, validators, controllers, services, repositories, migrations, seeds, tests |
| `infra/` | Nginx config (site + API proxy), CI notes, monitoring and alert rules |
| `scripts/` | Setup, deploy, smoke test, database backup and restore, contract check |
| `docs/` | Runbook, API description (`api/openapi.yaml`), decisions, final report |
| `.github/` | CI pipeline, manual Pages deploy, Dependabot |
| `README_ARCHITECTURE.md` | The rules this project is built to, with this project's file map (Section 16) |

## Read next

- [Runbook](docs/runbook.md): run, test, deploy, back up, troubleshoot
- [Definition of Done report](docs/definition-of-done.md): what is finished, what is not, known risks
- [API description](docs/api/openapi.yaml)
- [Decisions](docs/decisions/) (why things are the way they are)

## License

MIT, see [LICENSE](LICENSE).
