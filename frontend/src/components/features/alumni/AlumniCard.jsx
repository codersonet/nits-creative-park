/**
 * AlumniCard.jsx
 * What:  One graduate: class year, name, role, short bio, branch, city and a LinkedIn link.
 * Used by: AlumniSection
 * Talks to: GlassCard, utils/format.js
 */
import GlassCard from '@/components/ui/GlassCard.jsx';
import { formatClassLabel } from '@/utils/format.js';

export default function AlumniCard({ alumnus }) {
  return (
    <GlassCard as="article" className="alumni-card">
      <div className="alumni-badge">{formatClassLabel(alumnus.classYear)}</div>
      <h3 className="alumni-name">{alumnus.name}</h3>
      <p className="label-mono text-muted">
        {alumnus.role} @ {alumnus.company}
      </p>
      <p className="body-md">{alumnus.bio}</p>
      <div className="alumni-tags">
        <span className="chip">{alumnus.branch}</span>
        <span className="chip">{alumnus.location}</span>
        <a
          href={alumnus.linkedinUrl}
          target="_blank"
          rel="noopener noreferrer"
          className="chip-btn"
          aria-label={`${alumnus.name} on LinkedIn (opens in a new tab)`}
        >
          LINKEDIN ↗
        </a>
      </div>
    </GlassCard>
  );
}
