/**
 * MountainCanvas.jsx
 * What:  The animated night-sky background: twinkling stars and four wavy mountain lines that
 *        bend away from the pointer. A port of the old initMountainCanvas in script.js.
 *        It stops when the tab is hidden or "reduce motion" is on.
 * Used by: components/layout/Layout
 * Talks to: hooks/useReducedMotion.js, the #mountain-canvas rules in the legacy styles.css
 */
import { useEffect, useRef } from 'react';
import { useReducedMotion } from '@/hooks/useReducedMotion.js';

const MAX_PIXEL_RATIO = 2;
const OFF_SCREEN = -1000;
const STAR_COLORS = ['255, 255, 255', '240, 246, 255', '218, 238, 255', '245, 235, 255'];

// Builds the list of stars with random position, size, speed and twinkle rhythm.
function createStars(width, height) {
  const count = Math.min(width > 768 ? 85 : 40, 110);
  return Array.from({ length: count }, () => ({
    x: Math.random() * width,
    y: Math.random() * height,
    radius: Math.random() < 0.2 ? 1.5 : Math.random() < 0.6 ? 1.0 : 0.75,
    speedX: (Math.random() - 0.5) * 0.18,
    speedY: (Math.random() - 0.5) * 0.18,
    baseAlpha: Math.random() * 0.35 + 0.45,
    twinkleSpeed: Math.random() * 0.045 + 0.025,
    twinklePhase: Math.random() * Math.PI * 2,
    hasCross: Math.random() < 0.22,
    color: STAR_COLORS[Math.floor(Math.random() * STAR_COLORS.length)],
  }));
}

// How bright a star is right now: dim, normal, or a sharp flare at the peak of its twinkle.
function starBrightness(star, time) {
  const wave = Math.sin(time * star.twinkleSpeed + star.twinklePhase);
  if (wave > 0.35) {
    const flare = (wave - 0.35) / 0.65;
    return star.baseAlpha + (1 - star.baseAlpha) * flare ** 1.5;
  }
  return wave < -0.65 ? star.baseAlpha * 0.2 : star.baseAlpha;
}

// Moves one star (wrapping at the screen edges) and draws it.
function drawStar(ctx, star, width, height, time) {
  star.x = (star.x + star.speedX + width) % width;
  star.y = (star.y + star.speedY + height) % height;
  const brightness = starBrightness(star, time);
  const x = Math.round(star.x);
  const y = Math.round(star.y);

  if (star.hasCross && brightness > 0.88) {
    ctx.fillStyle = `rgba(255, 255, 255, ${(brightness * 0.9).toFixed(2)})`;
    ctx.fillRect(x - 3, y, 7, 1);
    ctx.fillRect(x, y - 3, 1, 7);
  }
  ctx.beginPath();
  ctx.arc(x, y, star.radius, 0, Math.PI * 2);
  ctx.fillStyle = `rgba(${star.color}, ${brightness.toFixed(2)})`;
  ctx.fill();
}

// Draws the four mountain lines. Near the pointer each line is pushed upwards.
function drawMountains(ctx, width, height, time, mouse) {
  const layers = [
    { amplitude: 45, frequency: 0.0025, speed: 0.0018, base: height * 0.62, color: 'rgba(56, 189, 248, 0.2)' },
    { amplitude: 75, frequency: 0.002, speed: 0.0012, base: height * 0.7, color: 'rgba(129, 140, 248, 0.25)' },
    { amplitude: 110, frequency: 0.0016, speed: 0.0008, base: height * 0.78, color: 'rgba(192, 132, 252, 0.2)' },
    { amplitude: 150, frequency: 0.0012, speed: 0.0005, base: height * 0.88, color: 'rgba(255, 255, 255, 0.12)' },
  ];
  layers.forEach((layer) => {
    ctx.beginPath();
    ctx.strokeStyle = layer.color;
    ctx.lineWidth = 1;
    for (let x = 0; x <= width; x += 18) {
      const distance = Math.hypot(x - mouse.x, layer.base - mouse.y);
      const push = distance < 260 ? Math.sin((distance / 260) * Math.PI) * -35 : 0;
      const y =
        layer.base +
        Math.sin(x * layer.frequency + time * layer.speed) * layer.amplitude +
        Math.cos(x * 0.004) * 18 +
        push;
      if (x === 0) ctx.moveTo(x, y);
      else ctx.lineTo(x, y);
    }
    ctx.stroke();
  });
}

export default function MountainCanvas() {
  const canvasRef = useRef(null);
  const reducedMotion = useReducedMotion();

  useEffect(() => {
    const canvas = canvasRef.current;
    const ctx = canvas.getContext('2d');
    const ratio = Math.min(window.devicePixelRatio || 1, MAX_PIXEL_RATIO);
    const mouse = { x: OFF_SCREEN, y: OFF_SCREEN, targetX: OFF_SCREEN, targetY: OFF_SCREEN };
    let width = window.innerWidth;
    let height = window.innerHeight;
    let stars = [];
    let time = 0;
    let frameId = null;

    // Fits the canvas to the window and keeps it sharp on high-density screens.
    function resize() {
      width = window.innerWidth;
      height = window.innerHeight;
      canvas.width = Math.floor(width * ratio);
      canvas.height = Math.floor(height * ratio);
      canvas.style.width = `${width}px`;
      canvas.style.height = `${height}px`;
      ctx.setTransform(ratio, 0, 0, ratio, 0, 0);
    }

    // Draws one frame, then asks for the next one.
    function frame() {
      frameId = null;
      if (document.hidden) return;
      ctx.clearRect(0, 0, width, height);
      mouse.x += (mouse.targetX - mouse.x) * 0.08;
      mouse.y += (mouse.targetY - mouse.y) * 0.08;
      stars.forEach((star) => drawStar(ctx, star, width, height, time));
      drawMountains(ctx, width, height, time, mouse);
      time += 1;
      schedule();
    }

    // Asks the browser for the next frame, unless one is already waiting or the tab is hidden.
    function schedule() {
      if (frameId === null && !document.hidden) frameId = requestAnimationFrame(frame);
    }

    // Pauses drawing while the tab is hidden and resumes when it comes back.
    function handleVisibility() {
      if (document.hidden && frameId !== null) {
        cancelAnimationFrame(frameId);
        frameId = null;
      } else {
        schedule();
      }
    }

    // Remembers where the pointer is, so the mountains can bend towards it.
    function handlePointerMove(event) {
      mouse.targetX = event.clientX;
      mouse.targetY = event.clientY;
    }

    // Forgets the pointer position when it leaves the window.
    function handlePointerLeave() {
      mouse.targetX = OFF_SCREEN;
      mouse.targetY = OFF_SCREEN;
    }

    resize();
    if (reducedMotion) {
      ctx.clearRect(0, 0, width, height);
      return undefined;
    }
    stars = createStars(width, height);
    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', handlePointerMove, { passive: true });
    window.addEventListener('pointerleave', handlePointerLeave);
    document.addEventListener('visibilitychange', handleVisibility);
    schedule();

    return () => {
      if (frameId !== null) cancelAnimationFrame(frameId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', handlePointerMove);
      window.removeEventListener('pointerleave', handlePointerLeave);
      document.removeEventListener('visibilitychange', handleVisibility);
    };
  }, [reducedMotion]);

  return <canvas id="mountain-canvas" ref={canvasRef} aria-hidden="true" />;
}
