/**
 * PageHeader.jsx
 * What:  The heading block at the top of every inner page.
 * Used by: every page except the home page
 * Talks to: nothing
 */

// "eyebrow" is the small mono line above the title, for example "TECHNICAL_SUBSYSTEMS".
export default function PageHeader({ eyebrow, title, description }) {
  return (
    <section className="page-header">
      <span className="label-mono">// {eyebrow}</span>
      <h1 className="headline-lg">{title}</h1>
      <p className="body-md">{description}</p>
    </section>
  );
}
