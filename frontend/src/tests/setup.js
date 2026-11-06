/**
 * setup.js
 * What:  Test setup. Adds DOM matchers and cleans the page after every test.
 * Used by: Vitest (listed in vite.config.js)
 *        Also gives jsdom a matchMedia stand-in, because jsdom does not have one.
 * Talks to: @testing-library/jest-dom, @testing-library/react
 */
import '@testing-library/jest-dom/vitest';
import { cleanup } from '@testing-library/react';
import { afterEach } from 'vitest';

// WHY: without this, components from one test would still be on screen in the next one.
afterEach(() => {
  cleanup();
});

// The fake always answers "no" (no reduced motion, no mouse), which is the safest default for tests.
if (!window.matchMedia) {
  window.matchMedia = (query) => ({
    matches: false,
    media: query,
    addEventListener() {},
    removeEventListener() {},
    dispatchEvent: () => false,
  });
}
