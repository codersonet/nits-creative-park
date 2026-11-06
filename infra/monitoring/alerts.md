# Monitoring and alerts

What to watch and when to wake someone up (mandate Section 9). The API writes one JSON log line per request (method, path, status, time, request ID) and one per error, so most of these can be built from the logs and the health endpoints with any monitoring service.

**Not built yet:** a metrics endpoint (for example Prometheus) and dashboards. The alerts below use health checks and logs only. Add metrics when traffic justifies it.

## Health endpoints

| URL | Meaning | Use it for |
|-----|---------|------------|
| `GET /healthz` (site container) | The site container is running | Container health check |
| `GET /health` (API, internal only) | The API process is running | Container health check |
| `GET /api/v1/metrics/overview` through the site | Site, proxy, API, database and cache path all work | External uptime monitor |

`/ready` on the API returns 503 when the database is down and reports `cache: "down"` when Redis is unreachable. It is not exposed through Nginx, so check it from inside the network (`docker compose exec backend wget -qO- http://127.0.0.1:4000/ready`).

## Alert rules

| Alert | Condition | Severity | First thing to check |
|-------|-----------|----------|----------------------|
| Site down | External uptime check fails for 2 minutes | Page someone | `docker compose ps`, then the frontend and backend logs |
| API errors | More than 1% of API answers are 5xx for 5 minutes | Page someone | Logs with `level: 50` (error), find the request ID |
| Slow API | 95th percentile above 500 ms for 10 minutes | Warning | Database slow-query log lines (`Slow query`), cache status |
| Database down | `/ready` returns 503 | Page someone | Postgres container, disk space, connection count |
| Cache down | `/ready` shows `cache: "down"` for 10 minutes | Warning | Redis container. The site still works, only slower |
| Rate limit spike | Many `429` answers from one address | Info | Possible abuse; the limit is already protecting the API |
| Disk space | Above 80% on the database volume | Warning | Old backups, log size |
| Backup missing | No new file in `backups/` for 25 hours | Warning | The cron job running `scripts/backup-db.sh` |
| Certificate | Expires in under 14 days | Warning | Renewal at the load balancer |
| Contact messages growing | Unreviewed messages older than 7 days | Info | Someone should read them (and the retention job deletes old ones) |

## Where errors are reported

Backend errors are logged with the request ID, and the same ID is shown to the visitor on the error screen (`REF: ...`), so a report can be traced. Frontend crashes are only logged in the visitor's browser: connect an error-reporting service (for example Sentry) when you are ready. This is listed as open in `docs/definition-of-done.md`.
