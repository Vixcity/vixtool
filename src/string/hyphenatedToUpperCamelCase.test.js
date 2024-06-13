import { hyphenatedToUpperCamelCase } from ".";

describe("hyphenatedToUpperCamelCase", () => {
  // 测试普通的连字符字符串
  test("converts hyphenated text to UpperCamelCase correctly", () => {
    expect(hyphenatedToUpperCamelCase("hyphenated-to-upper-camel-case")).toBe(
      "HyphenatedToUpperCamelCase"
    );
  });

  // 测试只有一个单词的情况，没有连字符
  test("converts single hyphenated word to UpperCamelCase correctly", () => {
    expect(hyphenatedToUpperCamelCase("single")).toBe("Single");
  });

  // 测试首字母已经大写的情况
  test("handles already capitalized initial letters correctly", () => {
    expect(hyphenatedToUpperCamelCase("Already-Capitalized")).toBe(
      "AlreadyCapitalized"
    );
  });

  // 测试包含多个连字符的情况
  test("converts multiple hyphenated sections correctly", () => {
    expect(hyphenatedToUpperCamelCase("multiple---hyphenated--sections")).toBe(
      "MultipleHyphenatedSections"
    );
  });

  // 测试空字符串的情况
  test("returns empty string if input is empty", () => {
    expect(hyphenatedToUpperCamelCase("")).toBe("");
  });

  // 测试字符串开头是连字符的情况
  test("handles leading hyphens correctly", () => {
    expect(hyphenatedToUpperCamelCase("-leading-hyphen")).toBe("LeadingHyphen");
  });

  // 测试字符串结尾是连字符的情况
  test("handles trailing hyphens correctly", () => {
    expect(hyphenatedToUpperCamelCase("trailing-hyphen-")).toBe(
      "TrailingHyphen"
    );
  });

  // 测试包含非字母字符的情况
  test("handles non-alphabet characters correctly", () => {
    expect(hyphenatedToUpperCamelCase("example-with-1234-numbers")).toBe(
      "ExampleWith1234Numbers"
    );
  });

  // 测试全小写字母连字符字符串
  test("converts all lowercase hyphenated string correctly", () => {
    expect(hyphenatedToUpperCamelCase("all-lower-case")).toBe("AllLowerCase");
  });
});
