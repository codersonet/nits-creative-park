/**
 * FestCard.jsx
 * What:  One of the four yearly fests: picture, name, season, description, topics and an
 *        "explore" button that filters the event list below.
 * Used by: FestsSection
 * Talks to: GlassCard, Button, utils/class-names.js
 */
import Button from '@/components/ui/Button.jsx';
import GlassCard from '@/components/ui/GlassCard.jsx';
import { cx } from '@/utils/class-names.js';

// "onExplore" is called with the fest's event category. The button is hidden when there is none.
export default function FestCard({ fest, onExplore }) {
  return (
    <GlassCard as="article" className="fest-card">
      <div>
        <div className={cx('fest-card-image', !fest.imageUrl && 'fest-card-image-empty')}>
          {fest.imageUrl && <img src={fest.imageUrl} alt={fest.imageAlt} loading="lazy" decoding="async" />}
        </div>
        <div className="card-header">
          <span className={cx('label-mono', `accent-${fest.accent}`)}>
            FEST_{String(fest.number).padStart(2, '0')} // {fest.kind}
          </span>
          <span className="label-mono">[{fest.season}]</span>
        </div>
        <h3 className="card-title">{fest.name}</h3>
        <p className="body-md fest-card-text">{fest.description}</p>
      </div>
      <div className="fest-card-bottom">
        <div className="alumni-tags fest-card-tags">
          {fest.tags.map((tag) => (
            <span className="chip" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className="card-footer">
          <span className="label-mono text-muted">TIMELINE: {fest.timeline}</span>
          {fest.filterCategory && (
            <Button variant="ghost" className="btn-small" onClick={() => onExplore(fest.filterCategory)}>
              EXPLORE ↗
            </Button>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
