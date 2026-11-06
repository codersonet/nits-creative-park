/**
 * DateBadge.jsx
 * What:  The small pill with a calendar icon and a date label.
 * Used by: FestHero, EventCard
 * Talks to: utils/date.js, react-icons
 */
import { FaRegCalendar } from 'react-icons/fa6';
import { formatDateRange } from '@/utils/date.js';

// "startDate" and "endDate" are ISO dates such as "2026-11-14". "endDate" may be empty.
export default function DateBadge({ startDate, endDate }) {
  return (
    <span className="event-date-badge">
      <FaRegCalendar aria-hidden="true" focusable="false" /> {formatDateRange(startDate, endDate)}
    </span>
  );
}
