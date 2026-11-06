/**
 * StatCard.jsx
 * What:  One big counting number with a label and a caption.
 * Used by: StatsGrid
 * Talks to: GlassCard, hooks/useCountUp.js, utils/format.js
 */
import GlassCard from '@/components/ui/GlassCard.jsx';
import { useCountUp } from '@/hooks/useCountUp.js';
import { formatCount } from '@/utils/format.js';

// Screen readers hear only the final number, not every step of the counting animation.
export default function StatCard({ label, value, caption }) {
  const { ref, value: shown } = useCountUp(value);
  return (
    <GlassCard className="stat-card">
      <span className="label-mono">{label}</span>
      <h2 className="headline-lg" ref={ref}>
        <span aria-hidden="true">{formatCount(shown)}</span>
        <span className="visually-hidden">{formatCount(value)}</span>
      </h2>
      <span className="label-mono text-muted">{caption}</span>
    </GlassCard>
  );
}
