/**
 * useCountUp.js
 * What:  Counts a number up from 0 when it scrolls into view (the old initStatsCounter).
 *        With "reduce motion" on, it shows the final number straight away.
 * Used by: components/features/stats/StatCard
 * Talks to: hooks/useReducedMotion.js, the browser's IntersectionObserver
 */
import { useEffect, useRef, useState } from 'react';
import { useReducedMotion } from './useReducedMotion.js';

const DURATION_MS = 1400;

// Attach "ref" to the element showing the number. "value" is the number to display right now.
export function useCountUp(target) {
  const ref = useRef(null);
  const reducedMotion = useReducedMotion();
  const [value, setValue] = useState(reducedMotion ? target : 0);

  useEffect(() => {
    if (reducedMotion) {
      setValue(target);
      return undefined;
    }
    const element = ref.current;
    if (!element) return undefined;

    let frameId = null;
    // Runs on every animation frame: ease-out curve, so the count slows near the end.
    function step(now, startTime) {
      const progress = Math.min((now - startTime) / DURATION_MS, 1);
      setValue(progress === 1 ? target : Math.floor((1 - (1 - progress) ** 3) * target));
      if (progress < 1) frameId = requestAnimationFrame((time) => step(time, startTime));
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (!entry.isIntersecting) return;
        observer.disconnect();
        const startTime = performance.now();
        frameId = requestAnimationFrame((time) => step(time, startTime));
      },
      { threshold: 0.25 },
    );
    observer.observe(element);

    return () => {
      observer.disconnect();
      if (frameId !== null) cancelAnimationFrame(frameId);
    };
  }, [target, reducedMotion]);

  return { ref, value };
}
