/**
 * OverviewStats.jsx
 * What:  The four counters under the home page hero. Loads its own data.
 * Used by: pages/HomePage
 * Talks to: hooks/useOverviewStats.js, QueryBoundary, StatsGrid, CardGridSkeleton
 */
import QueryBoundary from '@/components/ui/QueryBoundary.jsx';
import CardGridSkeleton from '@/components/skeletons/CardGridSkeleton.jsx';
import { useOverviewStats } from '@/hooks/useOverviewStats.js';
import StatsGrid from '@/components/features/stats/StatsGrid.jsx';

export default function OverviewStats() {
  const query = useOverviewStats();
  return (
    <section className="stats-section">
      <QueryBoundary query={query} skeleton={<CardGridSkeleton count={4} className="stats-grid" />}>
        {(data) => <StatsGrid stats={data.stats} />}
      </QueryBoundary>
    </section>
  );
}
