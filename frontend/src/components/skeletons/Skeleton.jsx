/**
 * Skeleton.jsx
 * What:  One shimmering grey block, the building piece of every loading placeholder.
 * Used by: CardSkeleton, PageSkeleton
 * Talks to: components.css (.skeleton), utils/class-names.js
 */
import { cx } from '@/utils/class-names.js';

// Size it with CSS units, for example width="60%" height="1.6rem". Hidden from screen readers.
export default function Skeleton({ width = '100%', height = '1rem', className }) {
  return <span className={cx('skeleton', className)} style={{ width, height }} aria-hidden="true" />;
}
