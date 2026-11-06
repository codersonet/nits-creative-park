/**
 * vitest.config.js
 * What:  Test runner settings. Unit tests need nothing running; integration tests need Postgres
 *        (they skip themselves when DATABASE_URL points nowhere).
 * Used by: npm test
 * Talks to: tests/setup.js
 */
import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    environment: "node",
    include: ["tests/**/*.test.js"],
    setupFiles: ["./tests/setup.js"],
    // Integration tests share one database, so test files must not run at the same time.
    fileParallelism: false,
  },
});
