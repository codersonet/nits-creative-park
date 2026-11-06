/**
 * CompanyBadge.jsx
 * What:  One partner in the scrolling strip: a small icon and the company name.
 * Used by: PartnersMarquee
 * Talks to: nothing
 */

// "hidden" is set on the repeated second copy of the strip, so screen readers read each name once.
export default function CompanyBadge({ company, hidden = false }) {
  return (
    <div className="company-badge" aria-hidden={hidden || undefined}>
      <svg className="company-logo-svg" viewBox="0 0 24 24" aria-hidden="true" focusable="false">
        <path d={company.logoPath} />
      </svg>
      <span className="company-name">{company.name}</span>
    </div>
  );
}
