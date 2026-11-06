/**
 * Button.jsx
 * What:  The site's button. Renders a router link, a normal link or a real <button>,
 *        always with the old .btn look.
 * Used by: pages and feature components
 * Talks to: react-router-dom, utils/class-names.js
 */
import { Link } from 'react-router-dom';
import { cx } from '@/utils/class-names.js';

const EXTERNAL_URL = /^https?:\/\//;

// variant: "primary" or "ghost". Give "to" for a page inside the site, "href" for any other
// address, or neither for an action button. A disabled button never navigates.
export default function Button({
  variant = 'primary',
  to,
  href,
  disabled = false,
  className,
  children,
  ...rest
}) {
  const classes = cx('btn', `btn-${variant}`, className);

  if (disabled) {
    return (
      <button type="button" className={classes} disabled {...rest}>
        {children}
      </button>
    );
  }
  if (to) {
    return (
      <Link to={to} className={classes} {...rest}>
        {children}
      </Link>
    );
  }
  if (href) {
    // SECURITY: links to other sites open in a new tab without handing over window.opener.
    const externalProps = EXTERNAL_URL.test(href)
      ? { target: '_blank', rel: 'noopener noreferrer' }
      : {};
    return (
      <a href={href} className={classes} {...externalProps} {...rest}>
        {children}
      </a>
    );
  }
  return (
    <button type="button" className={classes} {...rest}>
      {children}
    </button>
  );
}
