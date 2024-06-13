import { checkValueInCollection } from ".";

describe("checkValueInCollection", () => {
  // Testing with arrays
  test("should return true if value exists in array", () => {
    expect(checkValueInCollection(5, [1, 2, 3, 4, 5])).toBe(true);
  });

  test("should return false if value does not exist in array", () => {
    expect(checkValueInCollection(6, [1, 2, 3, 4, 5])).toBe(false);
  });

  // Testing with objects
  test("should return true if key exists in object when checking keys", () => {
    expect(
      checkValueInCollection("age", { name: "John", age: 30 }, "key")
    ).toBe(true);
  });

  test("should return false if key does not exist in object when checking keys", () => {
    expect(
      checkValueInCollection("gender", { name: "John", age: 30 }, "key")
    ).toBe(false);
  });

  test("should return true if value exists in object when checking values", () => {
    expect(
      checkValueInCollection("John", { name: "John", age: 30 }, "value")
    ).toBe(true);
  });

  test("should return false if value does not exist in object when checking values", () => {
    expect(checkValueInCollection(40, { name: "John", age: 30 }, "value")).toBe(
      false
    );
  });

  // Testing with strings
  test("should return true if value exists in string", () => {
    expect(checkValueInCollection("a", "cat")).toBe(true);
  });

  test("should return false if value does not exist in string", () => {
    expect(checkValueInCollection("z", "cat")).toBe(false);
  });

  // Testing with other types
  test("should return false if collection is neither an array, object, nor string", () => {
    expect(checkValueInCollection(1, 123)).toBe(false);
    expect(checkValueInCollection("a", 456)).toBe(false);
    expect(checkValueInCollection("key", true)).toBe(false);
    expect(checkValueInCollection("item", null)).toBe(false);
    expect(checkValueInCollection("item", undefined)).toBe(false);
  });
});
