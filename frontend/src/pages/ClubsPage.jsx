/**
 * ClubsPage.jsx
 * What:  Student clubs and live projects, with a category filter and a details pop-up.
 * Used by: routes/AppRoutes.jsx (path "/clubs")
 * Talks to: SeoHead, PageHeader, ProjectsBoard, hooks/usePageClass.js, legacy clubs.css
 */
import '@legacy/stylesheets/clubs.css';
import ProjectsBoard from '@/components/features/projects/ProjectsBoard.jsx';
import SeoHead from '@/components/layout/SeoHead.jsx';
import PageHeader from '@/components/ui/PageHeader.jsx';
import { ROUTES } from '@/constants/routes.js';
import { usePageClass } from '@/hooks/usePageClass.js';

export default function ClubsPage() {
  usePageClass('page-clubs');
  return (
    <>
      <SeoHead
        title="CLUBS & PROJECTS // NIT SIKKIM"
        description="Explore NIT Sikkim student clubs, engineering teams, and student-led technology, robotics, and creative projects."
        path={ROUTES.CLUBS}
      />
      <PageHeader
        eyebrow="TECHNICAL_SUBSYSTEMS"
        title="Student Clubs & Live Projects"
        description="Discover active student-led technical organizations, engineering initiatives, robotics labs, and software deployments at NIT Sikkim."
      />
      <ProjectsBoard />
    </>
  );
}
