#!/usr/bin/env bash
# setup.sh
# What:  First-time setup on a new machine: checks the tools, creates the .env files, installs
#        the packages of both apps. Safe to run again (it never overwrites an existing .env).
# Used by: a person, once:  scripts/setup.sh
set -euo pipefail
cd "$(dirname "$0")/.."

# Stops with a clear message when a needed tool is missing.
need() {
  command -v "$1" >/dev/null 2>&1 || { echo "Missing tool: $1. $2" >&2; exit 1; }
}
need node "Install Node.js 22 or newer from https://nodejs.org"
need npm "It comes with Node.js."
node -e 'process.exit(Number(process.versions.node.split(".")[0]) >= 22 ? 0 : 1)' \
  || { echo "Node.js 22 or newer is needed (you have $(node -v))." >&2; exit 1; }

# Copies an example file to the real name unless the real file already exists.
copy_env() {
  if [ -f "$2" ]; then echo "keep   $2 (already exists)"; else cp "$1" "$2"; echo "create $2 (edit it!)"; fi
}
copy_env .env.example .env
copy_env backend/.env.example backend/.env
copy_env frontend/.env.example frontend/.env

echo "Installing packages (this also creates package-lock.json, which you must commit)..."
(cd backend && npm install)
(cd frontend && npm install)

cat <<'MSG'

Setup finished. Next:
  1. Edit .env, backend/.env and frontend/.env (passwords, DATABASE_URL, REDIS_URL).
  2. Run everything in Docker:      docker compose up --build
     then load the starter content: docker compose run --rm migrate node seeds/seed.js
  3. Or run the parts yourself:     see docs/runbook.md, section 2.
MSG
