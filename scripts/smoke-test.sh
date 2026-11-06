#!/usr/bin/env bash
# smoke-test.sh
# What:  A quick "is it really working?" check after a deploy (mandate Section 12): the site, a
#        deep link, the API answers, bad input is refused. Waits up to a minute for start-up.
# Used by: scripts/deploy.sh, or a person:  scripts/smoke-test.sh http://localhost:8080
set -euo pipefail
BASE_URL="${1:-http://localhost:8080}"
failures=0

# Waits until the site answers its health check.
echo "Waiting for ${BASE_URL} ..."
for attempt in $(seq 1 30); do
  if curl -fsS -o /dev/null "${BASE_URL}/healthz" 2>/dev/null; then break; fi
  if [ "$attempt" -eq 30 ]; then echo "FAIL  site did not start in time"; exit 1; fi
  sleep 2
done

# check NAME EXPECTED_STATUS PATH [TEXT_THAT_MUST_APPEAR]
check() {
  local name="$1" expected="$2" path="$3" needle="${4:-}"
  local body status
  body="$(mktemp)"
  status="$(curl -sS -o "$body" -w '%{http_code}' "${BASE_URL}${path}" || echo 000)"
  if [ "$status" != "$expected" ]; then
    echo "FAIL  ${name}: expected ${expected}, got ${status}"; failures=$((failures + 1))
  elif [ -n "$needle" ] && ! grep -q "$needle" "$body"; then
    echo "FAIL  ${name}: answer does not contain ${needle}"; failures=$((failures + 1))
  else
    echo "ok    ${name}"
  fi
  rm -f "$body"
}

check "home page"               200 "/"                              'id="root"'
check "deep link (clubs)"       200 "/clubs"                         'id="root"'
check "projects API"            200 "/api/v1/projects"               '"success":true'
check "events API"              200 "/api/v1/events"                 '"success":true'
check "featured fest API"       200 "/api/v1/fests/featured"         '"success":true'
check "metrics API"             200 "/api/v1/metrics/overview"       '"success":true'
check "bad category refused"    400 "/api/v1/projects?category=nope" 'VALIDATION_FAILED'
check "unknown API path"        404 "/api/v1/nothing-here"           'NOT_FOUND'

if [ "$failures" -gt 0 ]; then echo "${failures} check(s) failed."; exit 1; fi
echo "All smoke checks passed."
