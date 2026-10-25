/**
 * CompaniesPage.jsx
 * What:  Visiting recruiters: the scrolling partner strip and the placement figures.
 * Used by: routes/AppRoutes.jsx (path "/companies")
 * Talks to: SeoHead, PageHeader, PartnersMarquee, PlacementStats, hooks/usePageClass.js, legacy companies.css
 */
import '@legacy/stylesheets/companies.css';
import PartnersMarquee from '@/components/features/companies/PartnersMarquee.jsx';
import PlacementStats from '@/components/features/companies/PlacementStats.jsx';
import SeoHead from '@/components/layout/SeoHead.jsx';
import PageHeader from '@/components/ui/PageHeader.jsx';
import { ROUTES } from '@/constants/routes.js';
import { usePageClass } from '@/hooks/usePageClass.js';

export default function CompaniesPage() {
  usePageClass('page-companies');
  return (
    <>
      <SeoHead
        title="RECRUITERS & PARTNERS // NIT SIKKIM"
        description="Leading technology firms, research organizations, and global enterprises actively hiring engineers and innovators from NIT Sikkim."
        path={ROUTES.COMPANIES}
      />
      <PageHeader
        eyebrow="INDUSTRY_NODES"
        title="Visiting Recruiters & Corporate Partners"
        description="Leading technology firms, research organizations, and global enterprises actively hiring engineers and innovators from NIT Sikkim."
      />
      <PartnersMarquee />
      <PlacementStats />
    </>
  );
}
