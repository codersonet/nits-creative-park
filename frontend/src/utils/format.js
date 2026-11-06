/**
 * format.js
 * What:  Small text formatters for values that arrive as plain data.
 * Used by: AlumniCard, PlacementStats
 * Talks to: nothing
 */

// 2021 -> "CLASS OF '21"
export function formatClassLabel(classYear) {
  return `CLASS OF '${String(classYear).slice(-2)}'`;
}

// 33.46 -> "₹ 33.46 LPA". Always two decimals so figures line up.
export function formatLpa(value) {
  return `₹ ${Number(value).toFixed(2)} LPA`;
}

// 1659 -> "1,659". Numbers below 1000 stay as they are, like the old counters.
export function formatCount(value) {
  return value >= 1000 ? value.toLocaleString("en-US") : String(value);
}
