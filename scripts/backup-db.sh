#!/usr/bin/env bash
# backup-db.sh
# What:  Saves the whole database to backups/creativepark-DATE.dump (mandate Section 5/11).
#        Backups hold personal data (contact messages): keep them private and off git.
# Used by: scripts/deploy.sh, a daily cron job, a person:  scripts/backup-db.sh
set -euo pipefail
cd "$(dirname "$0")/.."

# Reads one value from .env without running the file as a script.
env_value() { grep -E "^$1=" .env 2>/dev/null | head -1 | cut -d= -f2- || true; }
DB_USER="$(env_value POSTGRES_USER)"; DB_USER="${DB_USER:-creativepark}"
DB_NAME="$(env_value POSTGRES_DB)"; DB_NAME="${DB_NAME:-creativepark}"

mkdir -p backups
FILE="backups/creativepark-$(date +%Y%m%d-%H%M%S).dump"
docker compose exec -T postgres pg_dump -U "$DB_USER" -d "$DB_NAME" -Fc > "$FILE"
echo "Backup written: $FILE ($(du -h "$FILE" | cut -f1))"
echo "Copy it somewhere safe and OFF this machine, and test a restore regularly."
