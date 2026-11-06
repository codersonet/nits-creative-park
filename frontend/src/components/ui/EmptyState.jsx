/**
 * EmptyState.jsx
 * What:  The message shown when a list loaded fine but has nothing in it.
 * Used by: list pages (projects, events, alumni, companies)
 * Talks to: GlassCard
 */
import GlassCard from './GlassCard.jsx';

// "message" should say what the visitor can do next, not just "no results".
export default function EmptyState({ title = 'Nothing here yet', message }) {
  return (
    <GlassCard className="state-card">
      <h2 className="headline-lg">{title}</h2>
      {message && <p className="body-md">{message}</p>}
    </GlassCard>
  );
}
