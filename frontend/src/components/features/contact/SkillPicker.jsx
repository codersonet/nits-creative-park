/**
 * SkillPicker.jsx
 * What:  The "collaboration skills" panel: tags the visitor can switch on and off.
 * Used by: ContactSection
 * Talks to: GlassCard, utils/class-names.js
 */
import GlassCard from '@/components/ui/GlassCard.jsx';
import { cx } from '@/utils/class-names.js';

// "options" come from constants/contact-options.js. "selected" is a list of chosen values.
export default function SkillPicker({ options, selected, onToggle }) {
  return (
    <GlassCard className="skills-matrix-wrapper">
      <div className="card-header card-header-flush">
        <span className="label-mono accent-cyan">// COLLABORATION_SKILLS</span>
        <span className="label-mono text-muted">[SELECT DOMAINS]</span>
      </div>
      <p className="body-md skills-note">
        Select the student technical domains or engineering skills your transmission pertains to:
      </p>
      <div className="skills-matrix" role="group" aria-label="Collaboration skills">
        {options.map((option) => {
          const isOn = selected.includes(option.value);
          return (
            <button
              key={option.value}
              type="button"
              className={cx('skill-tag', isOn && 'selected')}
              aria-pressed={isOn}
              onClick={() => onToggle(option.value)}
            >
              {option.label}
            </button>
          );
        })}
      </div>
    </GlassCard>
  );
}
