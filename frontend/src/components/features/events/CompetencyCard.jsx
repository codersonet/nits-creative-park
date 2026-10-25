/**
 * CompetencyCard.jsx
 * What:  One skill-strength card: code name, percentage, title, text, a bar and topic chips.
 * Used by: CompetenciesSection
 * Talks to: GlassCard, ProgressBar, utils/class-names.js
 */
import GlassCard from '@/components/ui/GlassCard.jsx';
import ProgressBar from '@/components/ui/ProgressBar.jsx';
import { cx } from '@/utils/class-names.js';

export default function CompetencyCard({ competency }) {
  return (
    <GlassCard as="article" className="competency-card">
      <div className="card-header card-header-flush">
        <span className="label-mono text-muted">// {competency.code}</span>
        <span className={cx('headline-lg', 'competency-percent', `accent-${competency.accent}`)}>
          {competency.percent}%
        </span>
      </div>
      <h4 className="card-title competency-title">{competency.title}</h4>
      <p className="body-md competency-text">{competency.description}</p>
      <ProgressBar percent={competency.percent} label={`${competency.title} strength`} />
      <div className="alumni-tags">
        {competency.tags.map((tag) => (
          <span className="chip" key={tag}>
            {tag}
          </span>
        ))}
      </div>
    </GlassCard>
  );
}
