# Runbook

How to run, check, build and ship the React frontend. Backend steps are marked as future work.

## 1. First-time setup

1. Put the new files in your repo exactly as laid out in `README_ARCHITECTURE.md`, Section 16. The `frontend/` folder must sit next to the old `styles.css`.
2. Copy `frontend/.env.example` to `frontend/.env`.
3. In `frontend/`, run `npm install`. This creates `package-lock.json`. Commit it (CI and Docker need it).
4. Run `npm audit`. The package versions were pinned from memory and are old. Update any that have fixes.
5. Run `npm run format` once, then commit. CI checks formatting and the files were not formatted by Prettier yet.
6. Run `npm run lint` and `npm test`, and fix anything they report. These were written but never run.

## 2. Everyday commands (run inside `frontend/`)

| Command | What it does |
|---------|--------------|
| `npm run dev` | Dev server at `http://localhost:5173` (add the base path from `VITE_BASE_PATH`, for example `/nitsikkim-creatives/`) |
| `npm test` | Unit and component tests |
| `npm run lint` | Code and accessibility rules |
| `npm run format` / `format:check` | Fix / check formatting |
| `npm run build` | Production build in `frontend/dist` |
| `npm run preview` | Serve the built files locally |
| `npm run audit:prod` | Security audit of the packages that ship to visitors |

## 3. Run with Docker

From the repository root: `docker compose up --build`, then open `http://localhost:8080`. The image serves the site at the root (`VITE_BASE_PATH=/`). The compose hardening (read-only files, dropped privileges) has not been run yet, so if the container will not start, remove `read_only` and `tmpfs` first.

## 4. Settings (`.env`)

| Variable | Meaning |
|----------|---------|
| `VITE_SITE_URL` | Public address of the site. Required for builds. |
| `VITE_BASE_PATH` | Folder the site is served from. `/nitsikkim-creatives/` on GitHub Pages, `/` elsewhere. |
| `VITE_API_BASE_URL` | Start of every API address. Default `/api/v1`. |
| `VITE_USE_MOCK_DATA` | `true` = labelled placeholder data. `false` = call the real API. |
| `VITE_DEV_API_TARGET` | Optional. Backend address for the dev-server proxy, for example `http://localhost:4000`. |

Only public values belong in `VITE_` variables, because the browser can read them.

## 5. Switching the live site from the old pages to the React app

The old `static.yml` publishes the repository root. `deploy-pages.yml` publishes `frontend/dist` but only starts by hand.

1. In GitHub, open Actions, choose "Deploy frontend to GitHub Pages" and press "Run workflow". Check the result at the Pages address.
2. When you are happy, delete `.github/workflows/static.yml`, then in `deploy-pages.yml` change the trigger to `push: { branches: [main] }`.
3. Old links to `pages/clubs.html` and similar keep working: small redirect pages in `frontend/public/pages/` send visitors to `/clubs`.
4. GitHub Pages cannot serve app routes such as `/clubs` itself. `public/404.html` and `public/spa-redirect.js` handle that. If you move to a custom domain at the root, set `segmentsToKeep = 0` in `public/404.html`.

## 6. Going dynamic (when the backend exists)

1. Build the backend to match `docs/api/openapi.yaml`. Answers use one envelope, lists are paginated, errors never show internals.
2. Set `VITE_USE_MOCK_DATA=false` and point `VITE_API_BASE_URL` at the API (or use `VITE_DEV_API_TARGET` while developing).
3. Add the backend to `docker-compose.yml`, and add a `location /api/` proxy block to `infra/nginx/frontend.conf` (and `connect-src` in its Content-Security-Policy if the API is on another address).
4. The contact form turns on by itself, because its send button is only off in placeholder mode.
5. GitHub Pages cannot run a backend. The dynamic version needs a host that can (a container host or VM).

## 7. If something looks wrong

| Problem | Likely cause |
|---------|--------------|
| Blank page on GitHub Pages | `VITE_BASE_PATH` does not match the repository name |
| Refreshing `/clubs` shows GitHub's 404 | `404.html` or `spa-redirect.js` missing from the build |
| Page has no styling | `frontend/` is not directly inside the repo root, so the `@legacy` alias cannot find `styles.css` |
| Contact send button is off | Placeholder mode is on (`VITE_USE_MOCK_DATA=true`) |
| `npm run build` fails on `VITE_SITE_URL` | The variable is missing from `.env` |
