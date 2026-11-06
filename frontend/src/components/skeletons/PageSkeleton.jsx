/**
 * PageSkeleton.jsx
 * What:  The placeholder shown while a page's code is still downloading.
 * Used by: components/layout/Layout (as the Suspense fallback)
 * Talks to: Skeleton, CardGridSkeleton
 */
import Skeleton from './Skeleton.jsx';
import CardGridSkeleton from './CardGridSkeleton.jsx';

// Mimics a page header followed by a row of cards.
export default function PageSkeleton() {
  return (
    <>
      <div className="page-header" aria-hidden="true">
        <Skeleton width="160px" height="0.8rem" />
        <Skeleton width="min(520px, 80%)" height="2.4rem" className="page-skeleton-title" />
      </div>
      <CardGridSkeleton count={3} />
    </>
  );
}
