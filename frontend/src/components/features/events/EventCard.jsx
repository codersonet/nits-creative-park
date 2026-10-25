/**
 * EventCard.jsx
 * What:  One scheduled event: date, type, title, description, topics, organizer and an action.
 * Used by: EventsBoard
 * Talks to: GlassCard, Button, DateBadge, utils/class-names.js
 */
import Button from '@/components/ui/Button.jsx';
import GlassCard from '@/components/ui/GlassCard.jsx';
import { cx } from '@/utils/class-names.js';
import DateBadge from './DateBadge.jsx';

export default function EventCard({ event }) {
  const { action } = event;
  return (
    <GlassCard as="article" className="event-card">
      <div>
        <div className="card-header">
          <DateBadge startDate={event.startDate} endDate={event.endDate} />
          <span className={cx('label-mono', `accent-${event.accent}`)}>// {event.kind}</span>
        </div>
        <h3 className="card-title">{event.title}</h3>
        <p className="body-md">{event.description}</p>
      </div>
      <div className="event-card-bottom">
        <div className="alumni-tags event-card-tags">
          {event.tags.map((tag) => (
            <span className="chip" key={tag}>
              {tag}
            </span>
          ))}
        </div>
        <div className="card-footer">
          <span className="label-mono text-muted">ORGANIZER: {event.organizer}</span>
          {/* When the event has no real link yet, the button says so instead of pretending to work. */}
          {action.url ? (
            <Button variant={action.variant} href={action.url}>
              {action.label} ↗
            </Button>
          ) : (
            <Button variant="ghost" disabled>
              COMING_SOON
            </Button>
          )}
        </div>
      </div>
    </GlassCard>
  );
}
