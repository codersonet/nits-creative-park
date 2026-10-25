/**
 * AlumniSection.jsx
 * What:  The alumni page content: a grid of alumni cards. Loads its own data.
 * Used by: pages/AlumniPage
 * Talks to: hooks/useAlumni.js, QueryBoundary, AlumniCard, CardGridSkeleton
 */
import CardGridSkeleton from '@/components/skeletons/CardGridSkeleton.jsx';
import EmptyState from '@/components/ui/EmptyState.jsx';
import QueryBoundary from '@/components/ui/QueryBoundary.jsx';
import { useAlumni } from '@/hooks/useAlumni.js';
import AlumniCard from './AlumniCard.jsx';

export default function AlumniSection() {
  const query = useAlumni();
  return (
    <section className="alumni-section">
      <QueryBoundary
        query={query}
        skeleton={<CardGridSkeleton className="alumni-grid" />}
        isEmpty={(data) => data.items.length === 0}
        empty={<EmptyState title="No alumni listed yet" />}
      >
        {(data) => (
          <div className="grid-container alumni-grid">
            {data.items.map((alumnus) => (
              <AlumniCard key={alumnus.id} alumnus={alumnus} />
            ))}
          </div>
        )}
      </QueryBoundary>
    </section>
  );
}
