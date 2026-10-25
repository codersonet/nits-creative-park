/**
 * CompetenciesSection.jsx
 * What:  The "Competencies Incubated In Fests" block: heading and skill-strength cards.
 * Used by: pages/EventsPage
 * Talks to: hooks/useCompetencies.js, QueryBoundary, CompetencyCard, CardGridSkeleton
 */
import CardGridSkeleton from '@/components/skeletons/CardGridSkeleton.jsx';
import QueryBoundary from '@/components/ui/QueryBoundary.jsx';
import { useCompetencies } from '@/hooks/useCompetencies.js';
import CompetencyCard from './CompetencyCard.jsx';

export default function CompetenciesSection() {
  const query = useCompetencies();
  return (
    <section className="grid-container">
      <div className="section-header section-header-flush">
        <div>
          <span className="label-mono accent-cyan">// TECHNICAL_SPECTRUM</span>
          <h2 className="headline-lg section-title">Competencies Incubated In Fests</h2>
        </div>
      </div>
      <QueryBoundary
        query={query}
        skeleton={<CardGridSkeleton count={3} className="competency-spectrum-grid" />}
        isEmpty={(data) => data.items.length === 0}
        empty={null}
      >
        {(data) => (
          <div className="competency-spectrum-grid">
            {data.items.map((competency) => (
              <CompetencyCard key={competency.id} competency={competency} />
            ))}
          </div>
        )}
      </QueryBoundary>
    </section>
  );
}
