/**
 * NotFoundPage.jsx
 * What:  The page for addresses that do not exist (mandate Section 8.5). It tells search
 *        engines not to index it and offers a way back home.
 * Used by: routes/AppRoutes.jsx (the "*" route)
 * Talks to: SeoHead, PageHeader, Button, constants/routes.js
 */
import SeoHead from '@/components/layout/SeoHead.jsx';
import Button from '@/components/ui/Button.jsx';
import PageHeader from '@/components/ui/PageHeader.jsx';
import { ROUTES } from '@/constants/routes.js';

export default function NotFoundPage() {
  return (
    <>
      <SeoHead
        title="PAGE NOT FOUND // NIT SIKKIM"
        description="This page does not exist."
        path={ROUTES.HOME}
        noIndex
      />
      <PageHeader
        eyebrow="ERROR_404"
        title="Signal lost"
        description="We could not find the page you were looking for. It may have moved, or the address may be mistyped."
      />
      <div className="grid-container">
        <Button to={ROUTES.HOME}>BACK_TO_OVERVIEW</Button>
      </div>
    </>
  );
}
