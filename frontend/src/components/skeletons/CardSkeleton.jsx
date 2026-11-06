/**
 * CardSkeleton.jsx
 * What:  A loading placeholder shaped like a content card.
 * Used by: CardGridSkeleton
 * Talks to: GlassCard, Skeleton
 */
import GlassCard from '@/components/ui/GlassCard.jsx';
import Skeleton from './Skeleton.jsx';

// The five blocks stand in for: label, title, two text lines and a progress bar.
export default function CardSkeleton() {
  return (
    <GlassCard className="card-skeleton" aria-hidden="true">
      <Skeleton width="40%" height="0.8rem" />
      <Skeleton width="75%" height="1.6rem" />
      <Skeleton height="0.9rem" />
      <Skeleton width="90%" height="0.9rem" />
      <Skeleton height="5px" />
    </GlassCard>
  );
}
