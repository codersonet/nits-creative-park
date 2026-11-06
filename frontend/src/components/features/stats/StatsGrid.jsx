/**
 * StatsGrid.jsx
 * What:  A grid of StatCards.
 * Used by: OverviewStats (home page), MetricsDashboard (metrics page)
 * Talks to: StatCard, utils/class-names.js
 */
import { cx } from '@/utils/class-names.js';
import StatCard from './StatCard.jsx';

// "stats" is a list of { id, label, value, caption }.
export default function StatsGrid({ stats, className }) {
  return (
    <div className={cx('grid-container', 'stats-grid', className)}>
      {stats.map((stat) => (
        <StatCard key={stat.id} label={stat.label} value={stat.value} caption={stat.caption} />
      ))}
    </div>
  );
}
