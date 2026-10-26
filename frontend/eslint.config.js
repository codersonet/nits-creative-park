/**
 * eslint.config.js
 * What:  Lint rules for the frontend (React, hooks, accessibility, file size).
 * Used by: npm run lint, CI pipeline
 * Talks to: eslint plugins listed in package.json
 */
import js from '@eslint/js';
import globals from 'globals';
import react from 'eslint-plugin-react';
import reactHooks from 'eslint-plugin-react-hooks';
import jsxA11y from 'eslint-plugin-jsx-a11y';

export default [
  { ignores: ['dist', 'node_modules', 'coverage'] },
  js.configs.recommended,
  {
    files: ['**/*.{js,jsx}'],
    languageOptions: {
      ecmaVersion: 'latest',
      sourceType: 'module',
      globals: { ...globals.browser, ...globals.node },
      parserOptions: { ecmaFeatures: { jsx: true } },
    },
    settings: { react: { version: '18.3' } },
    plugins: { react, 'react-hooks': reactHooks, 'jsx-a11y': jsxA11y },
    rules: {
      ...react.configs.recommended.rules,
      ...react.configs['jsx-runtime'].rules,
      ...reactHooks.configs.recommended.rules,
      ...jsxA11y.configs.recommended.rules,
      // WHY: the project uses plain JavaScript, so prop shapes are documented in JSDoc instead.
      'react/prop-types': 'off',
      // Mandate Section 1: no leftover console.log. Warnings and errors may still be logged.
      'no-console': ['error', { allow: ['warn', 'error'] }],
      // Mandate Section 1: hard limit of 300 lines per file.
      'max-lines': ['error', { max: 300, skipBlankLines: true, skipComments: true }],
    },
  },
];
