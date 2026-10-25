/**
 * MetricsDashboard.jsx
 * What:  The metrics page content: four counters plus the participation and uptime panels.
 * Used by: pages/MetricsPage
 * Talks to: hooks/useCampusMetrics.js, QueryBoundary, StatsGrid, ParticipationCard, InfrastructureCard
 */
import CardGridSkeleton from '@/components/skeletons/CardGridSkeleton.jsx';
import QueryBoundary from '@/components/ui/QueryBoundary.jsx';
import StatsGrid from '@/components/features/stats/StatsGrid.jsx';
import { useCampusMetrics } from '@/hooks/useCampusMetrics.js';
import InfrastructureCard from './InfrastructureCard.jsx';
import ParticipationCard from './ParticipationCard.jsx';

export default function MetricsDashboard() {
  const query = useCampusMetrics();
  return (
    <section className="metrics-detailed-section">
      <QueryBoundary query={query} skeleton={<CardGridSkeleton count={4} className="stats-grid" />}>
        {(data) => (
          <>
            <StatsGrid stats={data.stats} className="stats-row" />
            <div className="grid-container metrics-columns">
              <ParticipationCard rows={data.participation} />
              <InfrastructureCard data={data.infrastructure} />
            </div>
          </>
        )}
      </QueryBoundary>
    </section>
  );
}
