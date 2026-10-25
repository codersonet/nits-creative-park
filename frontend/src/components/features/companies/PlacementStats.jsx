/**
 * PlacementStats.jsx
 * What:  The three panels under the partner strip: highest package, average package,
 *        and a link for companies to start a recruitment drive.
 * Used by: pages/CompaniesPage
 * Talks to: hooks/usePlacementStats.js, QueryBoundary, GlassCard, Button, utils/format.js
 */
import CardGridSkeleton from '@/components/skeletons/CardGridSkeleton.jsx';
import Button from '@/components/ui/Button.jsx';
import GlassCard from '@/components/ui/GlassCard.jsx';
import QueryBoundary from '@/components/ui/QueryBoundary.jsx';
import { ROUTES } from '@/constants/routes.js';
import { usePlacementStats } from '@/hooks/usePlacementStats.js';
import { formatLpa } from '@/utils/format.js';

export default function PlacementStats() {
  const query = usePlacementStats();
  return (
    <section className="companies-section">
      <QueryBoundary query={query} skeleton={<CardGridSkeleton count={3} className="placement-grid" />}>
        {(stats) => {
          const tag = `// STATS_${stats.academicYear.replace('-', '_')}`;
          return (
            <div className="grid-container placement-grid">
              <GlassCard>
                <span className="label-mono">{tag}</span>
                <h3 className="headline-lg stat-title">Highest Domestic Package</h3>
                <h2 className="headline-xl text-glow stat-value">
                  {formatLpa(stats.highestDomesticPackageLpa)}
                </h2>
                <span className="label-mono text-muted">{stats.highestPackageRole}</span>
              </GlassCard>
              <GlassCard>
                <span className="label-mono">{tag}</span>
                <h3 className="headline-lg stat-title">Average B.Tech Package</h3>
                <h2 className="headline-xl text-glow stat-value">
                  {formatLpa(stats.averageBtechPackageLpa)}
                </h2>
                <span className="label-mono text-muted">ACROSS ALL ENGINEERING BRANCHES</span>
              </GlassCard>
              <GlassCard>
                <span className="label-mono">// RECRUITMENT_CELL</span>
                <h3 className="headline-lg stat-title">Training & Placement</h3>
                <p className="body-md stat-value">
                  Direct access for companies to organize remote/on-campus drives at Ravangla campus.
                </p>
                <Button variant="ghost" to={ROUTES.CONTACT}>
                  INITIATE_DRIVE
                </Button>
              </GlassCard>
            </div>
          );
        }}
      </QueryBoundary>
    </section>
  );
}
