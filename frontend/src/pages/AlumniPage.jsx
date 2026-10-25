/**
 * AlumniPage.jsx
 * What:  The alumni directory.
 * Used by: routes/AppRoutes.jsx (path "/alumni")
 * Talks to: SeoHead, PageHeader, AlumniSection, hooks/usePageClass.js, legacy alumni.css
 */
import '@legacy/stylesheets/alumni.css';
import AlumniSection from '@/components/features/alumni/AlumniSection.jsx';
import SeoHead from '@/components/layout/SeoHead.jsx';
import PageHeader from '@/components/ui/PageHeader.jsx';
import { ROUTES } from '@/constants/routes.js';
import { usePageClass } from '@/hooks/usePageClass.js';

export default function AlumniPage() {
  usePageClass('page-alumni');
  return (
    <>
      <SeoHead
        title="ALUMNI DIRECTORY // NIT SIKKIM"
        description="Explore the NIT Sikkim alumni directory and discover graduates contributing across research, technology, startups, and public service."
        path={ROUTES.ALUMNI}
      />
      <PageHeader
        eyebrow="LEGACY_NODES"
        title="Global Alumni Network"
        description="Connecting past engineering graduates from NIT Sikkim now operating in research labs, tech giants, startups, and public sectors worldwide."
      />
      <AlumniSection />
    </>
  );
}
