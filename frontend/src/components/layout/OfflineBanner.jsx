/**
 * OfflineBanner.jsx
 * What:  A thin message at the top of the page when the device loses its connection
 *        (mandate Section 8.4). It disappears by itself when the connection returns.
 * Used by: components/layout/Layout
 * Talks to: hooks/useOnlineStatus.js
 */
import { useOnlineStatus } from '@/hooks/useOnlineStatus.js';

// Shows nothing while online. role="status" makes screen readers announce it politely.
export default function OfflineBanner() {
  const isOnline = useOnlineStatus();
  if (isOnline) return null;
  return (
    <div className="offline-banner label-mono" role="status">
      YOU ARE OFFLINE // SOME CONTENT MAY NOT LOAD
    </div>
  );
}
