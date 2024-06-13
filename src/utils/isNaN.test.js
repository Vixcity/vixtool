import { isNaN } from ".";

describe("isNaN", () => {
  test("should return true for NaN", () => {
    expect(isNaN(NaN)).toBe(true);
  });

  test("should return false for a number", () => {
    expect(isNaN(42)).toBe(false);
  });

  test("should return false for a string that can be converted to a number", () => {
    expect(isNaN("42")).toBe(false);
  });

  test("should return true for a string that cannot be converted to a number", () => {
    expect(isNaN("not a number")).toBe(false);
  });

  test("should return false for an empty string", () => {
    expect(isNaN("")).toBe(false);
  });

  test("should return false for null", () => {
    expect(isNaN(null)).toBe(false);
  });

  test("should return false for undefined", () => {
    expect(isNaN(undefined)).toBe(false);
  });

  test("should return false for an object", () => {
    expect(isNaN({})).toBe(false);
  });

  test("should return false for an array", () => {
    expect(isNaN([])).toBe(false);
  });

  test("should return false for a boolean", () => {
    expect(isNaN(true)).toBe(false);
  });

  test("should return false for a function", () => {
    expect(isNaN(function () {})).toBe(false);
  });

  test("should return false for a Date object", () => {
    expect(isNaN(new Date())).toBe(false);
  });

  test("should return false for a RegExp object", () => {
    expect(isNaN(/abc/)).toBe(false);
  });
});
