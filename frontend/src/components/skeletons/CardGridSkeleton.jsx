/**
 * CardGridSkeleton.jsx
 * What:  A grid of loading cards, shown while a list is being fetched.
 * Used by: list pages (projects, events, alumni), PageSkeleton
 * Talks to: CardSkeleton, utils/class-names.js
 */
import { cx } from '@/utils/class-names.js';
import CardSkeleton from './CardSkeleton.jsx';

// "className" should be the same grid class the real list uses (for example "projects-grid"),
// so the placeholders sit exactly where the cards will appear.
export default function CardGridSkeleton({ count = 6, className }) {
  return (
    <div className={cx('grid-container', className)} role="status" aria-busy="true">
      <span className="visually-hidden">Loading</span>
      {Array.from({ length: count }, (_, index) => (
        <CardSkeleton key={index} />
      ))}
    </div>
  );
}
