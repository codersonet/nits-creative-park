/**
 * usePageClass.js
 * What:  Puts a class such as "page-clubs" on <body> while a page is shown.
 * Used by: every page component
 * Talks to: the legacy stylesheets, which style pages through body.page-* selectors
 */
import { useEffect } from 'react';

// Adds the class on arrival and removes it on leave, so page styles never leak between pages.
export function usePageClass(pageClass) {
  useEffect(() => {
    document.body.classList.add(pageClass);
    return () => document.body.classList.remove(pageClass);
  }, [pageClass]);
}
