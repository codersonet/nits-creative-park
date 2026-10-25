/**
 * ProgressBar.jsx
 * What:  A thin progress bar that screen readers announce as "label, 72 percent".
 * Used by: project cards, competency cards, department participation
 * Talks to: nothing
 */

// "percent" is clamped between 0 and 100, so bad data can never break the layout.
export default function ProgressBar({ percent, label }) {
  const value = Math.min(100, Math.max(0, Number(percent) || 0));
  return (
    <div
      className="progress-bar"
      role="progressbar"
      aria-label={label}
      aria-valuemin={0}
      aria-valuemax={100}
      aria-valuenow={value}
    >
      <div className="progress-fill" style={{ width: `${value}%` }} />
    </div>
  );
}
