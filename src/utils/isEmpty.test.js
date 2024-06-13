import { isEmpty } from ".";

describe("isEmpty", () => {
  test("should return true for null", () => {
    expect(isEmpty(null)).toBe(true);
  });

  test("should return true for undefined", () => {
    expect(isEmpty(undefined)).toBe(true);
  });

  test("should return true for an empty string", () => {
    expect(isEmpty("")).toBe(true);
  });

  test("should return false for a non-empty string", () => {
    expect(isEmpty("Hello")).toBe(false);
  });

  test("should return false for a number", () => {
    expect(isEmpty(42)).toBe(false);
  });

  test("should return false for a boolean", () => {
    expect(isEmpty(true)).toBe(false);
  });

  test("should return false for an object", () => {
    expect(isEmpty({})).toBe(false);
  });

  test("should return false for an array", () => {
    expect(isEmpty([])).toBe(false);
  });

  test("should return false for a function", () => {
    expect(isEmpty(function () {})).toBe(false);
  });

  test("should return false for a Date object", () => {
    expect(isEmpty(new Date())).toBe(false);
  });

  test("should return false for a RegExp object", () => {
    expect(isEmpty(/abc/)).toBe(false);
  });

  test("should return false for a Map object", () => {
    expect(isEmpty(new Map())).toBe(false);
  });

  test("should return false for a Set object", () => {
    expect(isEmpty(new Set())).toBe(false);
  });

  test("should return false for a Promise object", () => {
    expect(isEmpty(new Promise(() => {}))).toBe(false);
  });

  test("should return false for a Symbol", () => {
    expect(isEmpty(Symbol("desc"))).toBe(false);
  });
});
