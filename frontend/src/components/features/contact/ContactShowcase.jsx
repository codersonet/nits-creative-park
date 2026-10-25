/**
 * ContactShowcase.jsx
 * What:  The three picture cards at the bottom of the contact page.
 * Used by: pages/ContactPage
 * Talks to: GlassCard, constants/contact-showcase.js, utils/class-names.js
 */
import GlassCard from '@/components/ui/GlassCard.jsx';
import { CONTACT_SHOWCASE } from '@/constants/contact-showcase.js';
import { cx } from '@/utils/class-names.js';

export default function ContactShowcase() {
  return (
    <div className="grid-container visual-showcase-grid">
      {CONTACT_SHOWCASE.map((item) => (
        <GlassCard key={item.id} as="article" className="visual-preview-card">
          <div
            className="card-bg-img"
            style={{ backgroundImage: `url('${item.imageUrl}')` }}
            aria-hidden="true"
          />
          <div className="showcase-text">
            <span className={cx('label-mono', `accent-${item.accent}`)}>// {item.code}</span>
            <h4 className="headline-lg showcase-title">{item.title}</h4>
            <span className="label-mono text-muted">{item.caption}</span>
          </div>
        </GlassCard>
      ))}
    </div>
  );
}
