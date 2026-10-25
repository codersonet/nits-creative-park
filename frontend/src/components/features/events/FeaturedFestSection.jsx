/**
 * FeaturedFestSection.jsx
 * What:  Loads and shows the spotlight fest at the top of the events page.
 *        Shows nothing when no fest is being promoted.
 * Used by: pages/EventsPage
 * Talks to: hooks/useFeaturedFest.js, QueryBoundary, FestHero, CardSkeleton
 */
import CardSkeleton from '@/components/skeletons/CardSkeleton.jsx';
import QueryBoundary from '@/components/ui/QueryBoundary.jsx';
import { useFeaturedFest } from '@/hooks/useFeaturedFest.js';
import FestHero from './FestHero.jsx';

export default function FeaturedFestSection() {
  const query = useFeaturedFest();
  return (
    <QueryBoundary
      query={query}
      skeleton={
        <div className="grid-container">
          <CardSkeleton />
        </div>
      }
      isEmpty={(data) => !data}
      empty={null}
    >
      {(fest) => <FestHero fest={fest} />}
    </QueryBoundary>
  );
}
