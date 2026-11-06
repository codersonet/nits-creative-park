#!/usr/bin/env bash
# deploy.sh
# What:  Builds the images, applies database migrations, starts everything and runs the smoke test.
#        Rolling back = go back to the previous version of the code and run this script again.
# Used by: a person on the server:  scripts/deploy.sh
set -euo pipefail
cd "$(dirname "$0")/.."

[ -f .env ] || { echo "Missing .env (copy .env.example and fill it in)." >&2; exit 1; }

# WHY: take a backup first, because a migration cannot always be undone (mandate Section 5).
if docker compose ps --status running postgres 2>/dev/null | grep -q postgres; then
  scripts/backup-db.sh
else
  echo "Database is not running yet, so there is nothing to back up."
fi

docker compose build
docker compose up -d
if ! scripts/smoke-test.sh "${BASE_URL:-http://localhost:8080}"; then
  echo "Smoke test failed. To roll back:  git checkout <previous-version>  &&  scripts/deploy.sh" >&2
  exit 1
fi
echo "Deploy finished."
