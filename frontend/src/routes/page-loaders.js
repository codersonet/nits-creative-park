/**
 * page-loaders.js
 * What:  For every page, a function that downloads that page's code. The router uses it to load
 *        pages on demand, and the navbar uses it to start the download early on hover.
 * Used by: routes/AppRoutes.jsx, components/layout/Navbar.jsx
 * Talks to: constants/routes.js, pages/*.jsx
 */
import { ROUTES } from '@/constants/routes.js';

export const PAGE_LOADERS = Object.freeze({
  [ROUTES.HOME]: () => import('@/pages/HomePage.jsx'),
  [ROUTES.CLUBS]: () => import('@/pages/ClubsPage.jsx'),
  [ROUTES.ALUMNI]: () => import('@/pages/AlumniPage.jsx'),
  [ROUTES.COMPANIES]: () => import('@/pages/CompaniesPage.jsx'),
  [ROUTES.EVENTS]: () => import('@/pages/EventsPage.jsx'),
  [ROUTES.METRICS]: () => import('@/pages/MetricsPage.jsx'),
  [ROUTES.CONTACT]: () => import('@/pages/ContactPage.jsx'),
});

// Starts downloading a page early. Calling it twice is harmless: the browser reuses the download.
// Only the page code is warmed up; the page's data still loads when the page opens.
export function prefetchPage(path) {
  PAGE_LOADERS[path]?.();
}
