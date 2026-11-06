/**
 * useOnlineStatus.js
 * What:  Tells components whether the device currently has a network connection.
 * Used by: components/layout/OfflineBanner
 * Talks to: the browser's online/offline events
 */
import { useSyncExternalStore } from 'react';

// Lets React know when the connection goes away or comes back.
function subscribe(onChange) {
  window.addEventListener('online', onChange);
  window.addEventListener('offline', onChange);
  return () => {
    window.removeEventListener('online', onChange);
    window.removeEventListener('offline', onChange);
  };
}

// Reads the current state from the browser.
function getSnapshot() {
  return navigator.onLine;
}

// Without a browser there is nothing to measure, so assume online.
function getServerSnapshot() {
  return true;
}

// Returns true while the device is online.
export function useOnlineStatus() {
  return useSyncExternalStore(subscribe, getSnapshot, getServerSnapshot);
}
