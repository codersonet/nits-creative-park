/**
 * ContactInfo.jsx
 * What:  The social links and the status card on the contact page.
 * Used by: ContactSection
 * Talks to: GlassCard, SocialIcon, constants/social-links.js, constants/env.js
 */
import GlassCard from '@/components/ui/GlassCard.jsx';
import SocialIcon from '@/components/ui/SocialIcon.jsx';
import { USE_MOCK_DATA } from '@/constants/env.js';
import { SOCIAL_LINKS } from '@/constants/social-links.js';

// The old page showed these four networks (Instagram was not on the contact page).
const CONTACT_NETWORK_IDS = ['github', 'twitter', 'linkedin', 'discord'];

export default function ContactInfo() {
  const networks = SOCIAL_LINKS.filter((link) => CONTACT_NETWORK_IDS.includes(link.id));
  return (
    <>
      <div>
        <span className="label-mono text-muted block-label">// EXTERNAL_NODES</span>
        <div className="social-nodes-grid">
          {networks.map(({ id, label, href }) => (
            <a
              key={id}
              href={href}
              className="social-node-card"
              target="_blank"
              rel="noopener noreferrer"
              aria-label={`${label} (opens in a new tab)`}
            >
              <SocialIcon id={id} />
              <span className="label-mono node-label">{label.toUpperCase()}</span>
            </a>
          ))}
        </div>
      </div>

      <GlassCard className="contact-status-card">
        <div className="status-dot" />
        <div>
          <span className="label-mono text-muted node-label">TELEMETRY_STATUS</span>
          {/* The old page always said "listening", even though nothing could be received. */}
          <h4 className="headline-lg status-title">
            {USE_MOCK_DATA ? 'FORM_OFFLINE // NOT CONNECTED YET' : 'LISTENING_FOR_TRANSMISSION...'}
          </h4>
        </div>
      </GlassCard>
    </>
  );
}
