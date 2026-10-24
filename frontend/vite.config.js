/**
 * vite.config.js
 * What:  Build, dev-server and test settings for the frontend.
 * Used by: Vite and Vitest (npm run dev / build / test)
 * Talks to: the repository root (legacy CSS), index.html
 */
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import react from '@vitejs/plugin-react';
import { loadEnv } from 'vite';
import { defineConfig } from 'vitest/config';

const frontendDir = path.dirname(fileURLToPath(import.meta.url));
// WHY: the original static site lives one folder up. New code imports its CSS through "@legacy".
const repoRoot = path.resolve(frontendDir, '..');

// Replaces the __SITE_URL__ placeholder in index.html with the real site address.
function siteUrlPlugin(siteUrl) {
  return {
    name: 'site-url-in-html',
    transformIndexHtml: (html) => html.replaceAll('__SITE_URL__', siteUrl),
  };
}

// Builds the config for the current command (dev, build or test).
export default defineConfig(({ command, mode }) => {
  const env = loadEnv(mode, frontendDir, 'VITE_');
  const siteUrl = (env.VITE_SITE_URL || '').replace(/\/+$/, '');

  // Fail early: a build without the site address would ship broken canonical and social links.
  if (command === 'build' && !siteUrl) {
    throw new Error('VITE_SITE_URL is missing. Copy .env.example to .env and set it.');
  }

  return {
    base: env.VITE_BASE_PATH || '/',
    plugins: [react(), siteUrlPlugin(siteUrl)],
    resolve: {
      alias: { '@': path.resolve(frontendDir, 'src'), '@legacy': repoRoot },
    },
    server: {
      port: 5173,
      // SECURITY: the dev server may only read the repo root, nothing above it.
      fs: { allow: [repoRoot] },
      // Sends /api calls to the backend during development once VITE_DEV_API_TARGET is set.
      proxy: env.VITE_DEV_API_TARGET
        ? { '/api': { target: env.VITE_DEV_API_TARGET, changeOrigin: true } }
        : undefined,
    },
    build: {
      target: 'es2020',
      rollupOptions: {
        output: {
          // PERF: rarely-changing libraries get their own file so browsers can cache them.
          manualChunks: {
            react: ['react', 'react-dom', 'react-router-dom'],
            query: ['@tanstack/react-query'],
          },
        },
      },
    },
    test: {
      environment: 'jsdom',
      setupFiles: ['./src/tests/setup.js'],
      css: false,
    },
  };
});
