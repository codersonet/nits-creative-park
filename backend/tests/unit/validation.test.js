/**
 * validation.test.js
 * What:  Checks the small readers that clean and check single values.
 * Used by: npm test
 * Talks to: utils/validation.js
 */
import { describe, expect, it } from "vitest";
import {
  readChoice,
  readEmail,
  readInteger,
  readText,
} from "../../src/utils/validation.js";

const opts = { min: 1, max: 100, fallback: 7 };

describe("readInteger", () => {
  it("reads numbers and numeric text", () => {
    const errors = [];
    expect(readInteger(errors, "page", "5", opts)).toBe(5);
    expect(readInteger(errors, "page", 6, opts)).toBe(6);
    expect(errors).toHaveLength(0);
  });

  it("uses the fallback when the value is missing", () => {
    const errors = [];
    expect(readInteger(errors, "page", undefined, opts)).toBe(7);
    expect(readInteger(errors, "page", "", opts)).toBe(7);
    expect(errors).toHaveLength(0);
  });

  it("rejects text, decimals, negatives, repeated parameters and values out of range", () => {
    ["abc", "1.5", "-1", ["1", "2"], "0", "101", "1e3", "99999999999"].forEach(
      (raw) => {
        const errors = [];
        readInteger(errors, "page", raw, opts);
        expect(errors).toHaveLength(1);
      },
    );
  });
});

describe("readChoice", () => {
  it('accepts allowed values and treats missing as "no filter"', () => {
    const errors = [];
    expect(readChoice(errors, "category", "tech", ["tech", "robotics"])).toBe(
      "tech",
    );
    expect(readChoice(errors, "category", undefined, ["tech"])).toBeUndefined();
    expect(errors).toHaveLength(0);
  });

  it("rejects anything not on the list, including SQL-looking text and arrays", () => {
    ["' OR 1=1 --", "TECH", ["tech"], { a: 1 }].forEach((raw) => {
      const errors = [];
      expect(readChoice(errors, "category", raw, ["tech"])).toBeUndefined();
      expect(errors).toHaveLength(1);
    });
  });
});

describe("readText", () => {
  it("trims, and turns line breaks in single-line fields into spaces", () => {
    const errors = [];
    expect(readText(errors, "name", "  Jane\nDoe  ", { max: 50 })).toBe(
      "Jane Doe",
    );
    expect(errors).toHaveLength(0);
  });

  it("keeps line breaks in multi-line fields and removes control characters", () => {
    const errors = [];
    expect(
      readText(errors, "message", "a\r\nb\u0000c", {
        max: 50,
        multiline: true,
      }),
    ).toBe("a\nbc");
    expect(errors).toHaveLength(0);
  });

  it("rejects missing, empty and too-long text", () => {
    [undefined, 5, "   ", "x".repeat(51)].forEach((raw) => {
      const errors = [];
      readText(errors, "name", raw, { max: 50 });
      expect(errors.length).toBeGreaterThan(0);
    });
  });
});

describe("readEmail", () => {
  it("lower-cases a valid address", () => {
    const errors = [];
    expect(readEmail(errors, "email", " Jane@Example.ORG ", { max: 254 })).toBe(
      "jane@example.org",
    );
    expect(errors).toHaveLength(0);
  });

  it("rejects bad shapes", () => {
    ["plain", "a@b", "@x.com", "a b@c.de"].forEach((raw) => {
      const errors = [];
      readEmail(errors, "email", raw, { max: 254 });
      expect(errors.length).toBeGreaterThan(0);
    });
  });
});
