/**
 * eslint.config.js
 * What:  Lint rules for the backend (mandate Section 1: no console.log, no huge files).
 * Used by: npm run lint, CI pipeline
 * Talks to: @eslint/js, globals
 */
import js from "@eslint/js";
import globals from "globals";

export default [
  { ignores: ["node_modules", "coverage"] },
  js.configs.recommended,
  {
    files: ["**/*.js"],
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.node },
    },
    rules: {
      // Use the logger instead (src/logger/logger.js). Scripts may print results with process.stdout.
      "no-console": "error",
      "max-lines": [
        "error",
        { max: 300, skipBlankLines: true, skipComments: true },
      ],
    },
  },
];
