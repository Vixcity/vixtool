import { isObject } from ".";

describe("isObject", () => {
  test("returns true for plain objects", () => {
    expect(isObject({})).toBe(true);
    expect(isObject({ key: "value" })).toBe(true);
    expect(isObject(Object.create(null))).toBe(true); // Object with no prototype
  });

  test("returns false for null", () => {
    expect(isObject(null)).toBe(false);
  });

  test("returns false for arrays", () => {
    expect(isObject([])).toBe(false);
    expect(isObject([1, 2, 3])).toBe(false);
  });

  test("returns false for functions", () => {
    expect(isObject(function () {})).toBe(false);
    expect(isObject(() => {})).toBe(false);
    expect(isObject(class {})).toBe(false);
  });

  test("returns false for primitives", () => {
    expect(isObject(1)).toBe(false);
    expect(isObject("string")).toBe(false);
    expect(isObject(true)).toBe(false);
    expect(isObject(Symbol("sym"))).toBe(false);
    expect(isObject(undefined)).toBe(false);
  });

  test("returns false for built-in objects that are not plain objects", () => {
    expect(isObject(new Date())).toBe(false);
    expect(isObject(/regex/)).toBe(false);
    expect(isObject(new Error())).toBe(false);
  });
});
