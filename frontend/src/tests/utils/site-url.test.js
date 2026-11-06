/**
 * site-url.test.js
 * What:  Checks that API picture paths get the site's base path, and nothing else is touched.
 * Used by: npm test
 * Talks to: utils/site-url.js
 */
import { describe, expect, it } from "vitest";
import { resolveSiteUrl, resolveSrcSet } from "@/utils/site-url.js";

// In tests the base path is "/" (Vite's default), so site-relative paths gain one leading slash.
describe("resolveSiteUrl", () => {
  it("puts the base path in front of a site-relative path", () => {
    expect(resolveSiteUrl("images/poster.webp")).toBe("/images/poster.webp");
  });

  it("leaves full addresses, data addresses and base-path addresses alone", () => {
    expect(resolveSiteUrl("https://images.example.org/a.jpg")).toBe(
      "https://images.example.org/a.jpg",
    );
    expect(resolveSiteUrl("//cdn.example.org/a.jpg")).toBe(
      "//cdn.example.org/a.jpg",
    );
    expect(resolveSiteUrl("data:image/png;base64,AAAA")).toBe(
      "data:image/png;base64,AAAA",
    );
    expect(resolveSiteUrl("/assets/a-1234.webp")).toBe("/assets/a-1234.webp");
  });

  it("passes empty values through", () => {
    expect(resolveSiteUrl(null)).toBeNull();
    expect(resolveSiteUrl("")).toBe("");
  });
});

describe("resolveSrcSet", () => {
  it("resolves every candidate and keeps its width", () => {
    expect(
      resolveSrcSet("images/a-640.webp 640w, images/a-1024.webp 1024w"),
    ).toBe("/images/a-640.webp 640w, /images/a-1024.webp 1024w");
  });

  it("returns empty values unchanged", () => {
    expect(resolveSrcSet(undefined)).toBeUndefined();
  });
});
