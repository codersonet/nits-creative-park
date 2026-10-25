/**
 * Footer.jsx
 * What:  The site footer: brand, link columns, newsletter box, social icons and copyright.
 * Used by: components/layout/Layout
 * Talks to: react-router-dom, constants/footer-links.js, constants/social-links.js, SocialIcon
 */
import { Link } from 'react-router-dom';
import SocialIcon from '@/components/ui/SocialIcon.jsx';
import { FOOTER_LINK_COLUMNS } from '@/constants/footer-links.js';
import { SOCIAL_LINKS } from '@/constants/social-links.js';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-brand">
          <span className="brand-title text-glow">NIT_SIKKIM</span>
          <p className="label-mono text-muted">NATIONAL INSTITUTE OF TECHNOLOGY SIKKIM</p>
          <p className="body-md">
            The pioneering high-altitude engineering and innovation hub nestled in the Himalayas.
          </p>
        </div>

        <div className="footer-links">
          <span className="label-mono text-muted">// TERMINAL_LINKS</span>
          <div className="footer-links-grid">
            {FOOTER_LINK_COLUMNS.map((column) => (
              <div className="footer-links-col" key={column[0].path}>
                {column.map(({ label, path }) => (
                  <Link key={path} to={path} className="footer-link">
                    {label}
                  </Link>
                ))}
              </div>
            ))}
          </div>
        </div>

        <div className="footer-newsletter">
          <span className="label-mono text-muted">// NETWORK_SYNC</span>
          <p className="body-md">
            Establish connection for real-time telemetry, campus updates, and alumni networking
            opportunities.
          </p>
          {/* PLACEHOLDER: there is no newsletter service yet, so the form is switched off.
              The old page pretended to subscribe people, which would have lost their emails. */}
          <form className="hud-form" aria-describedby="newsletter-note">
            <label className="visually-hidden" htmlFor="newsletter-email">
              Email address
            </label>
            <input
              id="newsletter-email"
              type="email"
              className="hud-input"
              placeholder="ENTER_EMAIL"
              disabled
            />
            <button type="submit" className="hud-submit" disabled>
              INITIATE
            </button>
          </form>
          <span id="newsletter-note" className="label-mono text-muted">
            SIGN-UP OPENS SOON
          </span>

          <div className="footer-social">
            {SOCIAL_LINKS.map(({ id, label, href }) => (
              <a
                key={id}
                href={href}
                className="social-icon"
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`${label} (opens in a new tab)`}
              >
                <SocialIcon id={id} />
              </a>
            ))}
          </div>
        </div>
      </div>

      <div className="footer-meta">
        <span className="label-mono text-muted">
          &copy; {new Date().getFullYear()} NIT SIKKIM // THE OUTPOST
        </span>
        <span className="label-mono text-muted">ENGINEERED FOR ENGINEERS</span>
      </div>
    </footer>
  );
}
