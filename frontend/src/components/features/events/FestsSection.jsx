/**
 * FestsSection.jsx
 * What:  The "4 Annual Campus Fests" block: heading and one card per fest.
 * Used by: pages/EventsPage
 * Talks to: hooks/useFests.js, QueryBoundary, FestCard, CardGridSkeleton
 */
import CardGridSkeleton from '@/components/skeletons/CardGridSkeleton.jsx';
import QueryBoundary from '@/components/ui/QueryBoundary.jsx';
import { useFests } from '@/hooks/useFests.js';
import FestCard from './FestCard.jsx';

// "onExplore" is passed down to each card's explore button.
export default function FestsSection({ onExplore }) {
  const query = useFests();
  return (
    <section className="grid-container">
      <div className="section-header section-header-flush">
        <div>
          <span className="label-mono accent-cyan">// ANNUAL_QUADRANT</span>
          <h2 className="headline-lg section-title">The 4 Annual Campus Fests</h2>
        </div>
        <span className="label-mono text-muted">FOUR SEASONS // FOUR CONVERGENCES</span>
      </div>
      <QueryBoundary
        query={query}
        skeleton={<CardGridSkeleton count={4} className="fests-grid" />}
        isEmpty={(data) => data.items.length === 0}
        empty={null}
      >
        {(data) => (
          <div className="fests-grid">
            {data.items.map((fest) => (
              <FestCard key={fest.id} fest={fest} onExplore={onExplore} />
            ))}
          </div>
        )}
      </QueryBoundary>
    </section>
  );
}
