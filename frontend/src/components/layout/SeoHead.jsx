/**
 * SeoHead.jsx
 * What:  Sets the browser tab title and the search/social tags for one page (mandate Section 8.4).
 * Used by: every page
 * Talks to: react-helmet-async, constants/env.js (SITE_URL)
 */
import { Helmet } from 'react-helmet-async';
import { SITE_URL } from '@/constants/env.js';

// "path" is the page's route, for example "/clubs". It becomes the canonical address.
// "noIndex" tells search engines to skip the page (used for the not-found page).
export default function SeoHead({ title, description, path, noIndex = false }) {
  const url = `${SITE_URL}${path}`;
  return (
    <Helmet>
      <title>{title}</title>
      <meta name="description" content={description} />
      {noIndex ? <meta name="robots" content="noindex" /> : <link rel="canonical" href={url} />}
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      <meta property="og:url" content={url} />
      <meta name="twitter:title" content={title} />
      <meta name="twitter:description" content={description} />
    </Helmet>
  );
}
