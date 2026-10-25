/**
 * FilterBar.jsx
 * What:  A row of filter buttons. The chosen one looks active and is announced as pressed.
 * Used by: ProjectsBoard, EventsBoard
 * Talks to: utils/class-names.js
 */
import { cx } from '@/utils/class-names.js';

// "options" come from constants/categories.js. "label" names the group for screen readers.
export default function FilterBar({ options, value, onChange, label }) {
  return (
    <div className="filter-bar" role="group" aria-label={label}>
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            className={cx('filter-btn', isActive && 'active')}
            aria-pressed={isActive}
            onClick={() => onChange(option.value)}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
