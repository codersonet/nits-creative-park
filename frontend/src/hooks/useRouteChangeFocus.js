/**
 * useRouteChangeFocus.js
 * What:  After every page change, scrolls to the top and moves keyboard/screen-reader focus
 *        to the main area, so the new page is announced (mandate Section 8.5).
 * Used by: components/layout/Layout
 * Talks to: react-router-dom
 */
import { useEffect, useRef } from 'react';
import { useLocation } from 'react-router-dom';

// "ref" points at the <main> element. Nothing happens on the very first load.
export function useRouteChangeFocus(ref) {
  const { pathname } = useLocation();
  const isFirstRender = useRef(true);

  useEffect(() => {
    if (isFirstRender.current) {
      isFirstRender.current = false;
      return;
    }
    window.scrollTo(0, 0);
    ref.current?.focus({ preventScroll: true });
  }, [pathname, ref]);
}
