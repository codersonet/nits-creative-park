/**
 * useCardTilt.js
 * What:  The old card effect: a light spot follows the pointer and, on mouse devices,
 *        the card tilts slightly (the old initCardSpotlightAndTilt in script.js).
 * Used by: components/ui/GlassCard
 * Talks to: hooks/useReducedMotion.js, the legacy .glass-card styles (--mouse-x, --mouse-y)
 */
import { useCallback } from 'react';
import { useReducedMotion } from './useReducedMotion.js';

const FINE_POINTER = '(hover: hover) and (pointer: fine)';
const MAX_TILT_DEGREES = 3;

// Returns the two pointer handlers to put on a card element.
export function useCardTilt() {
  const reducedMotion = useReducedMotion();

  // Moves the light spot, and tilts the card when the device has a mouse and motion is allowed.
  const onPointerMove = useCallback(
    (event) => {
      const card = event.currentTarget;
      const rect = card.getBoundingClientRect();
      const x = event.clientX - rect.left;
      const y = event.clientY - rect.top;
      card.style.setProperty('--mouse-x', `${x}px`);
      card.style.setProperty('--mouse-y', `${y}px`);
      if (reducedMotion || !window.matchMedia(FINE_POINTER).matches) return;

      const rotateX = ((y - rect.height / 2) / (rect.height / 2)) * -MAX_TILT_DEGREES;
      const rotateY = ((x - rect.width / 2) / (rect.width / 2)) * MAX_TILT_DEGREES;
      card.style.transform = `perspective(1000px) rotateX(${rotateX.toFixed(2)}deg) rotateY(${rotateY.toFixed(2)}deg) translateY(-4px)`;
    },
    [reducedMotion],
  );

  // Puts the card back flat when the pointer leaves.
  const onPointerLeave = useCallback((event) => {
    event.currentTarget.style.transform = '';
  }, []);

  return { onPointerMove, onPointerLeave };
}
