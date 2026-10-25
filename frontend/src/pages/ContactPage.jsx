/**
 * ContactPage.jsx
 * What:  The contact page: skill picker, links, the terminal-style form and the picture cards.
 * Used by: routes/AppRoutes.jsx (path "/contact")
 * Talks to: SeoHead, ContactSection, ContactShowcase, hooks/usePageClass.js, legacy contact.css
 */
import '@legacy/stylesheets/contact.css';
import ContactSection from '@/components/features/contact/ContactSection.jsx';
import ContactShowcase from '@/components/features/contact/ContactShowcase.jsx';
import SeoHead from '@/components/layout/SeoHead.jsx';
import { ROUTES } from '@/constants/routes.js';
import { usePageClass } from '@/hooks/usePageClass.js';

export default function ContactPage() {
  usePageClass('page-contact');
  return (
    <>
      <SeoHead
        title="CONTACT // NIT SIKKIM"
        description="Get in touch with NIT Sikkim engineering labs, project leads, innovation cells and campus administration."
        path={ROUTES.CONTACT}
      />
      <section className="page-header">
        <div className="hud-badge">
          <span className="label-mono">UPLINK // TERMINAL_V2</span>
        </div>
        <h1 className="headline-xl">
          ESTABLISH
          <br />
          <span className="text-glow">CONNECTION</span>
        </h1>
        <p className="body-md">
          Direct high-priority communication link to NIT Sikkim Engineering Labs, technical project
          leads, innovation cells, and campus administration.
        </p>
      </section>
      <ContactSection />
      <ContactShowcase />
    </>
  );
}
