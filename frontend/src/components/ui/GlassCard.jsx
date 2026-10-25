/**
 * GlassCard.jsx
 * What:  The frosted-glass card used all over the site (the old .glass-card),
 *        with the pointer spotlight and tilt effect.
 * Used by: cards, panels, error and empty states
 * Talks to: utils/class-names.js, hooks/useCardTilt.js
 */
import { useCardTilt } from '@/hooks/useCardTilt.js';
import { cx } from '@/utils/class-names.js';

// "as" lets a card be an <article> or <section> when that is the better HTML.
export default function GlassCard({ as: Tag = 'div', className, children, ...rest }) {
  const tilt = useCardTilt();
  return (
    <Tag className={cx('glass-card', className)} {...rest} {...tilt}>
      {children}
    </Tag>
  );
}
