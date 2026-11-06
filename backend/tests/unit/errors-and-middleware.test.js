/**
 * errors-and-middleware.test.js
 * What:  Checks that failures become safe answers (no stack, no internal text) and that request
 *        IDs are accepted only when they look safe.
 * Used by: npm test
 * Talks to: middleware/error.middleware.js, middleware/requestId.middleware.js, errors/AppError.js
 */
import { describe, expect, it } from "vitest";
import { NotFoundError, ValidationError } from "../../src/errors/AppError.js";
import {
  describeError,
  errorHandler,
} from "../../src/middleware/error.middleware.js";
import { requestId } from "../../src/middleware/requestId.middleware.js";

// A stand-in for the response object that remembers what was sent.
function fakeResponse() {
  const res = { headers: {} };
  res.status = (code) => ((res.statusCode = code), res);
  res.json = (body) => ((res.body = body), res);
  res.setHeader = (name, value) => ((res.headers[name] = value), res);
  return res;
}

describe("describeError", () => {
  it("keeps the status, code and details of expected errors", () => {
    expect(describeError(new NotFoundError())).toMatchObject({
      status: 404,
      code: "NOT_FOUND",
    });
    const details = [{ field: "a", message: "bad" }];
    expect(describeError(new ValidationError(details))).toMatchObject({
      status: 400,
      details,
    });
  });

  it("maps body-reader errors", () => {
    expect(describeError({ type: "entity.too.large" }).status).toBe(413);
    expect(describeError({ type: "entity.parse.failed" }).status).toBe(400);
  });

  it("turns anything else into a generic 500", () => {
    const described = describeError(new Error("password=hunter2 at db.js:42"));
    expect(described.status).toBe(500);
    expect(described.message).not.toMatch(/hunter2/);
  });
});

describe("errorHandler", () => {
  it("never leaks the stack or the real message of an unexpected error", () => {
    const logged = [];
    const req = {
      id: "req-12345678",
      log: { error: (...args) => logged.push(args) },
    };
    const res = fakeResponse();
    errorHandler(new Error("secret internals"), req, res);
    expect(res.statusCode).toBe(500);
    expect(JSON.stringify(res.body)).not.toMatch(/secret internals|stack|at /);
    expect(res.body).toMatchObject({
      success: false,
      data: null,
      requestId: "req-12345678",
    });
    expect(logged).toHaveLength(1);
  });

  it("sends field details for validation errors", () => {
    const res = fakeResponse();
    errorHandler(
      new ValidationError([{ field: "email", message: "bad" }]),
      { id: "r" },
      res,
    );
    expect(res.statusCode).toBe(400);
    expect(res.body.error.details).toEqual([
      { field: "email", message: "bad" },
    ]);
  });
});

describe("requestId", () => {
  it("keeps a safe incoming ID", () => {
    const req = { headers: { "x-request-id": "abc12345-def" } };
    const res = fakeResponse();
    requestId(req, res, () => {});
    expect(req.id).toBe("abc12345-def");
    expect(res.headers["X-Request-Id"]).toBe("abc12345-def");
  });

  it("replaces unsafe or missing IDs", () => {
    ["../../etc/passwd", "x".repeat(200), "short", undefined].forEach(
      (incoming) => {
        const req = { headers: { "x-request-id": incoming } };
        requestId(req, fakeResponse(), () => {});
        expect(req.id).toMatch(/^[0-9a-f-]{36}$/);
      },
    );
  });
});
