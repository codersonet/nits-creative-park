/**
 * metrics.model.js
 * What:  The shape of the metric counters, department participation rows and the uptime panel.
 * Used by: repositories/metrics.repository.js
 * Talks to: nothing
 */
export const STATS_SELECT = 'id, label, value, caption';
export const PARTICIPATION_SELECT = 'id, department, percent';
export const INFRASTRUCTURE_SELECT = `title, description,
  grid_power_uptime_percent::float8 AS "gridPowerUptimePercent",
  node_latency_ms::float8 AS "nodeLatencyMs"`;
