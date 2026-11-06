/**
 * useReducedMotion.js
 * What:  Tells components whether the visitor asked their device to reduce motion.
 * Used by: MountainCanvas, Marquee, card tilt, counters
 * Talks to: the browser's matchMedia
 */
import { useSyncExternalStore } from 'react';

const QUERY = '(prefers-reduced-motion: reduce)';

// Lets React know when the visitor changes the setting.
function subscribe(onChange) {
  const media = window.matchMedia(QUERY);
  media.addEventListener('change', onChange);
  return () => media.removeEventListener('change', onChange);
}

// Reads the current setting.
function getSnapshot() {
  return window.matchMedia(QUERY).matches;
}

// Without a browser window there is no setting, so assume motion is fine.
function getServerSnapshot() {
  return false;
}

// Returns true when animations should be skipped or kept very small.
export function useReducedMotion() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
