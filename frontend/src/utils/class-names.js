/**
 * class-names.js
 * What:  Joins CSS class names, skipping empty or false ones.
 * Used by: Button, GlassCard, Modal, Skeleton and other components
 * Talks to: nothing
 */

// cx('btn', isBig && 'btn-big', undefined) -> "btn"
export function cx(...names) {
  return names.filter(Boolean).join(" ");
}
