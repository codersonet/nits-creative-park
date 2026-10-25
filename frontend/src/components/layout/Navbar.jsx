/**
 * Navbar.jsx
 * What:  The top bar: brand, page links and the status badge. The current page's link
 *        gets the "active" class automatically, which the old stylesheet already styles.
 * Used by: components/layout/Layout
 * Talks to: react-router-dom, constants/navigation.js, constants/routes.js, routes/page-loaders.js
 */
import { Link, NavLink } from 'react-router-dom';
import { NAV_LINKS } from '@/constants/navigation.js';
import { ROUTES } from '@/constants/routes.js';
import { prefetchPage } from '@/routes/page-loaders.js';

export default function Navbar() {
  return (
    <header className="navbar">
      <div className="nav-container">
        <Link to={ROUTES.HOME} className="brand">
          <span className="brand-title">NIT_SIKKIM</span>
          <span className="label-mono brand-tag">// THE_OUTPOST</span>
        </Link>

        <nav className="nav-links" aria-label="Main">
          {NAV_LINKS.map(({ label, path }) => (
            <NavLink
              key={path}
              to={path}
              end={path === ROUTES.HOME}
              className="nav-link"
              onPointerEnter={() => prefetchPage(path)}
              onFocus={() => prefetchPage(path)}
            >
              {label}
            </NavLink>
          ))}
        </nav>

        <div className="nav-status">
          <span className="status-dot" />
          <span className="label-mono">SYS_STATUS: ACTIVE</span>
        </div>
      </div>
    </header>
  );
}
