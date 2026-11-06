/**
 * date.js
 * What:  Turns ISO dates ("2026-11-14") into the labels shown on event and fest cards.
 * Used by: EventCard, FestHero
 * Talks to: nothing
 */
const MONTHS = ['JAN', 'FEB', 'MAR', 'APR', 'MAY', 'JUN', 'JUL', 'AUG', 'SEP', 'OCT', 'NOV', 'DEC'];
const ISO_DATE = /^\d{4}-\d{2}-\d{2}$/;

// Reads "2026-11-14" by hand.
// WHY: new Date("2026-11-14") is read as UTC midnight and can show the day before in some time zones.
function parseDate(isoDate) {
  const [year, month, day] = isoDate.split('-').map(Number);
  return { year, monthName: MONTHS[month - 1], day: String(day).padStart(2, '0') };
}

// One full date, for example "OCT 28, 2026".
function formatFull({ monthName, day, year }) {
  return `${monthName} ${day}, ${year}`;
}

// Builds the date label for a start date and an optional end date.
//   one day        OCT 28, 2026
//   same month     NOV 14 - 15, 2026
//   across months  OCT 30 - NOV 01, 2026
//   across years   DEC 30, 2026 - JAN 02, 2027
// Returns an empty string for a missing or invalid start date, so a card never shows "undefined".
export function formatDateRange(startDate, endDate) {
  if (!ISO_DATE.test(startDate ?? '')) return '';
  const start = parseDate(startDate);
  if (!ISO_DATE.test(endDate ?? '') || endDate === startDate) return formatFull(start);

  const end = parseDate(endDate);
  if (start.year !== end.year) return `${formatFull(start)} - ${formatFull(end)}`;
  if (start.monthName !== end.monthName) {
    return `${start.monthName} ${start.day} - ${end.monthName} ${end.day}, ${end.year}`;
  }
  return `${start.monthName} ${start.day} - ${end.day}, ${end.year}`;
}
