/**
 * routes.js
 * What:  Every page address in one place, so no component hard-codes a URL.
 * Used by: navigation.js, router definitions, page links, sitemap checks
 * Talks to: nothing
 */

// Clean URLs without ".html". The router adds the site's base path in front.
export const ROUTES = Object.freeze({
  HOME: '/',
  CLUBS: '/clubs',
  ALUMNI: '/alumni',
  COMPANIES: '/companies',
  EVENTS: '/events',
  METRICS: '/metrics',
  CONTACT: '/contact',
});
