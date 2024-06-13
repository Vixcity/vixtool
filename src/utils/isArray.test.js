import { isArray } from ".";

describe("isArray", () => {
  test("should return true for an empty array", () => {
    expect(isArray([])).toBe(true);
  });

  test("should return true for an array with elements", () => {
    expect(isArray([1, 2, 3])).toBe(true);
  });

  test("should return true for an instance of Array", () => {
    expect(isArray(new Array(3))).toBe(true);
  });

  test("should return false for null", () => {
    expect(isArray(null)).toBe(false);
  });

  test("should return false for undefined", () => {
    expect(isArray(undefined)).toBe(false);
  });

  test("should return false for an object", () => {
    expect(isArray({})).toBe(false);
  });

  test("should return false for a string", () => {
    expect(isArray("string")).toBe(false);
  });

  test("should return false for a number", () => {
    expect(isArray(42)).toBe(false);
  });

  test("should return false for a boolean", () => {
    expect(isArray(true)).toBe(false);
  });

  test("should return false for a function", () => {
    expect(isArray(function () {})).toBe(false);
  });

  test("should return false for a Date object", () => {
    expect(isArray(new Date())).toBe(false);
  });

  test("should return false for a RegExp object", () => {
    expect(isArray(/abc/)).toBe(false);
  });
});
