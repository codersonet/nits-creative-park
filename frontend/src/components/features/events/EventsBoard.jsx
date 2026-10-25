/**
 * EventsBoard.jsx
 * What:  The "Scheduled Events & Competitions" block: category filter and event cards.
 *        The chosen category is owned by the page, so the fest cards can change it too.
 * Used by: pages/EventsPage
 * Talks to: hooks/useEvents.js, FilterBar, QueryBoundary, EventCard, CardGridSkeleton
 */
import CardGridSkeleton from '@/components/skeletons/CardGridSkeleton.jsx';
import EmptyState from '@/components/ui/EmptyState.jsx';
import FilterBar from '@/components/ui/FilterBar.jsx';
import QueryBoundary from '@/components/ui/QueryBoundary.jsx';
import { EVENT_CATEGORIES } from '@/constants/categories.js';
import { useEvents } from '@/hooks/useEvents.js';
import EventCard from './EventCard.jsx';

export default function EventsBoard({ category, onCategoryChange }) {
  const query = useEvents(category);
  return (
    <section className="events-section" id="events-section">
      <div className="section-header">
        <div>
          <span className="label-mono accent-cyan">// CURATED_TIMELINE</span>
          <h2 className="headline-lg section-title">Scheduled Events & Competitions</h2>
        </div>
        <FilterBar
          options={EVENT_CATEGORIES}
          value={category}
          onChange={onCategoryChange}
          label="Filter events by category"
        />
      </div>
      <QueryBoundary
        query={query}
        skeleton={<CardGridSkeleton className="projects-grid" />}
        isEmpty={(data) => data.items.length === 0}
        empty={<EmptyState title="No events here yet" message="Try another category." />}
      >
        {(data) => (
          <div className="grid-container projects-grid">
            {data.items.map((event) => (
              <EventCard key={event.id} event={event} />
            ))}
          </div>
        )}
      </QueryBoundary>
    </section>
  );
}
