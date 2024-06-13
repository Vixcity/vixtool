import { hyphenatedToLowerCamelCase } from ".";

describe("hyphenatedToLowerCamelCase", () => {
  test("should convert hyphenated text to lowerCamelCase", () => {
    expect(hyphenatedToLowerCamelCase("test-string")).toBe("testString");
  });

  test("should handle empty strings correctly", () => {
    expect(hyphenatedToLowerCamelCase("")).toBe("");
  });

  test("should not modify strings without hyphens", () => {
    expect(hyphenatedToLowerCamelCase("teststring")).toBe("teststring");
  });

  test("should handle strings that start with a hyphen", () => {
    expect(hyphenatedToLowerCamelCase("-test-string")).toBe("testString");
  });

  test("should handle strings that end with a hyphen", () => {
    expect(hyphenatedToLowerCamelCase("test-string-")).toBe("testString");
  });

  test("should handle strings with multiple hyphens in a row", () => {
    expect(hyphenatedToLowerCamelCase("test---string")).toBe("testString");
  });

  test("should handle strings with uppercase letters", () => {
    expect(hyphenatedToLowerCamelCase("Test-String")).toBe("testString");
  });

  test("should handle strings with numbers", () => {
    expect(hyphenatedToLowerCamelCase("test-string2")).toBe("testString2");
  });

  test("should handle strings with numbers following a hyphen", () => {
    expect(hyphenatedToLowerCamelCase("test-2string")).toBe("test2String");
  });
});
