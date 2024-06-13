import { type } from ".";

describe("type", () => {
  test('should return "Null" for null', () => {
    expect(type(null)).toBe("Null");
  });

  test('should return "Undefined" for undefined', () => {
    expect(type(undefined)).toBe("Undefined");
  });

  test('should return "NaN" for NaN', () => {
    expect(type(NaN)).toBe("NaN");
  });

  test('should return "Number" for a number', () => {
    expect(type(42)).toBe("Number");
  });

  test('should return "String" for a string', () => {
    expect(type("Hello")).toBe("String");
  });

  test('should return "Boolean" for a boolean', () => {
    expect(type(true)).toBe("Boolean");
  });

  test('should return "Object" for an object', () => {
    expect(type({})).toBe("Object");
  });

  test('should return "Array" for an array', () => {
    expect(type([])).toBe("Array");
  });

  test('should return "Function" for a function', () => {
    expect(type(function () {})).toBe("Function");
  });

  test('should return "Date" for a Date object', () => {
    expect(type(new Date())).toBe("Date");
  });

  test('should return "RegExp" for a RegExp object', () => {
    expect(type(/abc/)).toBe("RegExp");
  });

  test('should return "Map" for a Map object', () => {
    expect(type(new Map())).toBe("Map");
  });

  test('should return "Set" for a Set object', () => {
    expect(type(new Set())).toBe("Set");
  });

  test('should return "Promise" for a Promise object', () => {
    expect(type(new Promise(() => {}))).toBe("Promise");
  });

  test('should return "Symbol" for a Symbol', () => {
    expect(type(Symbol("desc"))).toBe("Symbol");
  });
});
