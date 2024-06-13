import { camelCaseToHyphenated } from ".";

describe("camelCaseToHyphenated", () => {
  // 测试一个普通的驼峰式字符串
  test("converts camelCase to hyphenated correctly", () => {
    expect(camelCaseToHyphenated("camelCaseToHyphenated")).toBe(
      "camel-case-to-hyphenated"
    );
  });

  // 测试开头是大写字母的字符串
  test("converts CamelCase with leading uppercase letter", () => {
    expect(camelCaseToHyphenated("CamelCaseToHyphenated")).toBe(
      "camel-case-to-hyphenated"
    );
  });

  // 测试一个连续大写字母的字符串
  test("converts camelCase with consecutive uppercase letters", () => {
    expect(camelCaseToHyphenated("camelCASEToHyphenated")).toBe(
      "camel-c-a-s-e-to-hyphenated"
    );
  });

  // 测试全大写的字符串
  test("converts all uppercase letters correctly", () => {
    expect(camelCaseToHyphenated("CAMELCASE")).toBe("c-a-m-e-l-c-a-s-e");
  });

  // 测试一个空字符串
  test("returns empty string if input is empty", () => {
    expect(camelCaseToHyphenated("")).toBe("");
  });

  // 测试只包含小写字母的字符串
  test("does not change lowercase only strings", () => {
    expect(camelCaseToHyphenated("lowercase")).toBe("lowercase");
  });

  // 测试包含非字母字符的字符串
  test("handles non-letter characters correctly", () => {
    expect(camelCaseToHyphenated("number123And$Sign")).toBe(
      "number123-and$-sign"
    );
  });

  // 测试包含数字和横杠的字符串
  test("handles strings with numbers and hyphens", () => {
    expect(camelCaseToHyphenated("version2Updates")).toBe("version2-updates");
  });
});
