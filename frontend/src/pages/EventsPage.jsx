/**
 * EventsPage.jsx
 * What:  Fests and events: spotlight fest, the four annual fests, competencies and the
 *        filterable event schedule. The page owns the chosen category, so a fest's
 *        "explore" button can filter the schedule.
 * Used by: routes/AppRoutes.jsx (path "/events")
 * Talks to: SeoHead, the events feature sections, hooks/usePageClass.js, legacy events.css
 */
import '@legacy/stylesheets/events.css';
import { useState } from 'react';
import CompetenciesSection from '@/components/features/events/CompetenciesSection.jsx';
import EventsBoard from '@/components/features/events/EventsBoard.jsx';
import FeaturedFestSection from '@/components/features/events/FeaturedFestSection.jsx';
import FestsSection from '@/components/features/events/FestsSection.jsx';
import SeoHead from '@/components/layout/SeoHead.jsx';
import { ALL_CATEGORY } from '@/constants/categories.js';
import { ROUTES } from '@/constants/routes.js';
import { usePageClass } from '@/hooks/usePageClass.js';
import { useReducedMotion } from '@/hooks/useReducedMotion.js';

export default function EventsPage() {
  usePageClass('page-events');
  const reducedMotion = useReducedMotion();
  const [category, setCategory] = useState(ALL_CATEGORY);

  // Filters the schedule to a fest's category and scrolls the schedule into view.
  function handleExplore(nextCategory) {
    setCategory(nextCategory);
    document
      .getElementById('events-section')
      ?.scrollIntoView({ behavior: reducedMotion ? 'auto' : 'smooth' });
  }

  return (
    <>
      <SeoHead
        title="FESTS & EVENTS // NIT SIKKIM"
        description="Explore the annual fests, hackathons, robotics trials, cultural nights and engineering events at NIT Sikkim."
        path={ROUTES.EVENTS}
      />
      <section className="page-header">
        <div className="hud-badge">
          <span className="label-mono">// ANNUAL_CONVERGENCES</span>
        </div>
        <h1 className="headline-xl">
          FESTS & CAMPUS
          <br />
          <span className="text-glow">CONCLAVES</span>
        </h1>
        <p className="body-md">
          From national-level autonomous rover trials to high-altitude hackathons, cultural arts,
          and startup incubations. Explore the four annual flagships and scheduled engineering
          summits at NIT Sikkim.
        </p>
      </section>
      <FeaturedFestSection />
      <FestsSection onExplore={handleExplore} />
      <CompetenciesSection />
      <EventsBoard category={category} onCategoryChange={setCategory} />
    </>
  );
}
