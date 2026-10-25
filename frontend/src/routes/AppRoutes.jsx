/**
 * AppRoutes.jsx
 * What:  The list of pages and their addresses. Each page loads on demand (code splitting),
 *        so the first visit downloads only the page that is opened.
 * Used by: App.jsx
 * Talks to: react-router-dom, Layout, page-loaders.js, constants/routes.js
 */
import { lazy } from 'react';
import { Route, Routes } from 'react-router-dom';
import Layout from '@/components/layout/Layout.jsx';
import { ROUTES } from '@/constants/routes.js';
import { PAGE_LOADERS } from './page-loaders.js';

const HomePage = lazy(PAGE_LOADERS[ROUTES.HOME]);
const ClubsPage = lazy(PAGE_LOADERS[ROUTES.CLUBS]);
const AlumniPage = lazy(PAGE_LOADERS[ROUTES.ALUMNI]);
const CompaniesPage = lazy(PAGE_LOADERS[ROUTES.COMPANIES]);
const EventsPage = lazy(PAGE_LOADERS[ROUTES.EVENTS]);
const MetricsPage = lazy(PAGE_LOADERS[ROUTES.METRICS]);
const ContactPage = lazy(PAGE_LOADERS[ROUTES.CONTACT]);
const NotFoundPage = lazy(() => import('@/pages/NotFoundPage.jsx'));

export default function AppRoutes() {
  return (
    <Routes>
      <Route element={<Layout />}>
        <Route path={ROUTES.HOME} element={<HomePage />} />
        <Route path={ROUTES.CLUBS} element={<ClubsPage />} />
        <Route path={ROUTES.ALUMNI} element={<AlumniPage />} />
        <Route path={ROUTES.COMPANIES} element={<CompaniesPage />} />
        <Route path={ROUTES.EVENTS} element={<EventsPage />} />
        <Route path={ROUTES.METRICS} element={<MetricsPage />} />
        <Route path={ROUTES.CONTACT} element={<ContactPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Route>
    </Routes>
  );
}
