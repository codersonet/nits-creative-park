#!/usr/bin/env bash
# restore-db.sh
# What:  Puts a backup file back into the database. It REPLACES what is there now.
#        Test this on a spare copy regularly: a backup you have never restored is only a hope.
# Used by: a person:  scripts/restore-db.sh backups/creativepark-20261101-090000.dump
set -euo pipefail
cd "$(dirname "$0")/.."

FILE="${1:-}"
[ -n "$FILE" ] && [ -f "$FILE" ] || { echo "Usage: scripts/restore-db.sh <backup-file>" >&2; exit 1; }

env_value() { grep -E "^$1=" .env 2>/dev/null | head -1 | cut -d= -f2- || true; }
DB_USER="$(env_value POSTGRES_USER)"; DB_USER="${DB_USER:-creativepark}"
DB_NAME="$(env_value POSTGRES_DB)"; DB_NAME="${DB_NAME:-creativepark}"

read -r -p "This REPLACES the database '${DB_NAME}'. Type 'restore' to continue: " answer
[ "$answer" = "restore" ] || { echo "Cancelled."; exit 1; }

docker compose exec -T postgres pg_restore -U "$DB_USER" -d "$DB_NAME" --clean --if-exists --no-owner < "$FILE"
echo "Restore finished. Clear the cache if it is in use:  docker compose restart redis"
