/**
 * ParticipationCard.jsx
 * What:  The "Club Participation Rate" panel: one progress bar per department.
 * Used by: MetricsDashboard
 * Talks to: GlassCard, ProgressBar
 */
import GlassCard from '@/components/ui/GlassCard.jsx';
import ProgressBar from '@/components/ui/ProgressBar.jsx';

// "rows" is a list of { id, department, percent }.
export default function ParticipationCard({ rows }) {
  return (
    <GlassCard>
      <span className="label-mono">// DEPT_ENGAGEMENT</span>
      <h3 className="headline-lg panel-title">Club Participation Rate</h3>
      {rows.map((row) => (
        <div className="progress-container" key={row.id}>
          <div className="card-header card-header-flush">
            <span className="label-mono">{row.department}</span>
            <span className="label-mono">{row.percent}%</span>
          </div>
          <ProgressBar percent={row.percent} label={`${row.department} participation`} />
        </div>
      ))}
    </GlassCard>
  );
}
