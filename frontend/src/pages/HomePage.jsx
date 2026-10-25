/**
 * HomePage.jsx
 * What:  The landing page: hero section and the four campus counters.
 * Used by: routes/AppRoutes.jsx (path "/")
 * Talks to: SeoHead, Hero, OverviewStats, hooks/usePageClass.js, legacy index.css
 */
import '@legacy/stylesheets/index.css';
import Hero from '@/components/features/home/Hero.jsx';
import OverviewStats from '@/components/features/home/OverviewStats.jsx';
import SeoHead from '@/components/layout/SeoHead.jsx';
import { ROUTES } from '@/constants/routes.js';
import { usePageClass } from '@/hooks/usePageClass.js';

export default function HomePage() {
  usePageClass('page-home');
  return (
    <>
      <SeoHead
        title="NIT Sikkim - Creative_Park"
        description="Explore NIT Sikkim student clubs, engineering projects, innovation labs, events, recruitment partners, and the alumni network in one creative hub."
        path={ROUTES.HOME}
      />
      <Hero />
      <OverviewStats />
    </>
  );
}
