/**
 * Layout.jsx
 * What:  The frame around every page: skip link, navbar, the page itself, footer.
 *        The page is wrapped in a crash catcher and a loading placeholder.
 * Used by: the router (routes/AppRoutes.jsx, Batch 6)
 * Talks to: Navbar, Footer, ErrorBoundary, PageSkeleton, hooks/useRouteChangeFocus.js
 */
import { Suspense, useRef } from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import PageSkeleton from '@/components/skeletons/PageSkeleton.jsx';
import { useRouteChangeFocus } from '@/hooks/useRouteChangeFocus.js';
import ErrorBoundary from './ErrorBoundary.jsx';
import Footer from './Footer.jsx';
import Navbar from './Navbar.jsx';

export default function Layout() {
  const mainRef = useRef(null);
  const { pathname } = useLocation();
  useRouteChangeFocus(mainRef);

  return (
    <>
      <a className="skip-link" href="#main-content">
        Skip to content
      </a>
      <Navbar />
      <main id="main-content" ref={mainRef} tabIndex={-1}>
        {/* WHY key={pathname}: moving to another page clears a crash left by the previous one. */}
        <ErrorBoundary key={pathname}>
          <Suspense fallback={<PageSkeleton />}>
            <Outlet />
          </Suspense>
        </ErrorBoundary>
      </main>
      <Footer />
    </>
  );
}
