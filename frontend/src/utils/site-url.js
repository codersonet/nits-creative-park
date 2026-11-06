/**
 * site-url.js
 * What:  Makes picture addresses that come from the API work under the site's base path.
 *        The API sends site-relative paths such as "images/poster.webp"; on GitHub Pages the
 *        site lives in a folder, so the real address is "/nitsikkim-creatives/images/poster.webp".
 * Used by: components/features/events/FestHero, FestCard
 * Talks to: constants/env.js
 */
import { BASE_PATH } from '@/constants/env.js';

const FULL_ADDRESS = /^(?:[a-z][a-z0-9+.-]*:)?\/\//i;

// Full addresses ("https://...", "//cdn..."), data: addresses and addresses that already start
// with the base path are returned as they are. Anything else gets the base path in front.
export function resolveSiteUrl(path) {
  if (!path || FULL_ADDRESS.test(path) || path.startsWith('data:') || path.startsWith(BASE_PATH)) {
    return path;
  }
  return `${BASE_PATH}${path.replace(/^\/+/, '')}`;
}

// Resolves every address inside an <img srcset> value: "a.webp 640w, b.webp 1024w".
export function resolveSrcSet(srcSet) {
  if (!srcSet) return srcSet;
  return srcSet
    .split(',')
    .map((candidate) => {
      const [url, ...descriptor] = candidate.trim().split(/\s+/);
      return [resolveSiteUrl(url), ...descriptor].join(' ');
    })
    .join(', ');
}
