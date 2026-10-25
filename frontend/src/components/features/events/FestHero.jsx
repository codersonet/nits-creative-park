/**
 * FestHero.jsx
 * What:  The large spotlight card for the current fest: poster, status, dates, highlights,
 *        quick facts and two buttons.
 * Used by: FeaturedFestSection
 * Talks to: GlassCard, Button, DateBadge, react-icons
 */
import { FaLocationDot, FaTrophy, FaUsers } from 'react-icons/fa6';
import Button from '@/components/ui/Button.jsx';
import GlassCard from '@/components/ui/GlassCard.jsx';
import DateBadge from './DateBadge.jsx';

const FACT_ICONS = { trophy: FaTrophy, users: FaUsers, location: FaLocationDot };

// "fest" is the featured fest object from the fest service.
export default function FestHero({ fest }) {
  const badge = fest.registrationOpen ? `${fest.status} // REGISTRATIONS_OPEN` : fest.status;
  return (
    <section className="grid-container" id="featured-fest" aria-label="Featured fest">
      <GlassCard className="fest-hero-card">
        <div className="fest-hero-image-wrapper">
          <div className="fest-hero-badge">
            <span className="status-dot" />
            <span>{badge}</span>
          </div>
          {/* This is the biggest image on the page, so it loads first. Width and height stop layout jumps. */}
          <img
            src={fest.image.src}
            srcSet={fest.image.srcSet}
            sizes="(max-width: 1024px) 100vw, 40vw"
            width={fest.image.width}
            height={fest.image.height}
            alt={fest.image.alt}
            className="fest-hero-image"
            fetchpriority="high"
          />
        </div>

        <div>
          <div className="card-header">
            <span className="label-mono accent-cyan">// {fest.tagline}</span>
            <DateBadge startDate={fest.startDate} endDate={fest.endDate} />
          </div>
          <h2 className="headline-lg fest-title">{fest.name}</h2>
          <p className="body-md fest-description">{fest.description}</p>

          <div className="fest-block">
            <span className="label-mono text-muted block-label">// EXCLUSIVITY</span>
            <div className="alumni-tags">
              {fest.highlights.map((item) => (
                <span className="chip" key={item}>
                  {item}
                </span>
              ))}
            </div>
          </div>

          <div className="alumni-tags fest-facts">
            {fest.facts.map(({ icon, label }) => {
              const Icon = FACT_ICONS[icon];
              return (
                <span className="chip" key={label}>
                  {Icon && <Icon aria-hidden="true" focusable="false" />} {label}
                </span>
              );
            })}
          </div>

          <div className="hero-actions">
            <Button href={fest.primaryAction.url}>{fest.primaryAction.label} ↗</Button>
            <Button variant="ghost" href={fest.secondaryAction.url}>
              {fest.secondaryAction.label}
            </Button>
          </div>
        </div>
      </GlassCard>
    </section>
  );
}
