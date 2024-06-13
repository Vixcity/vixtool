import { convertRomanToInteger } from ".";

describe("convertRomanToInteger", () => {
  // 测试特定罗马数字到整数的转换
  test("converts Roman numerals to integers", () => {
    expect(convertRomanToInteger("I")).toBe(1);
    expect(convertRomanToInteger("IV")).toBe(4);
    expect(convertRomanToInteger("IX")).toBe(9);
    expect(convertRomanToInteger("LVIII")).toBe(58);
    expect(convertRomanToInteger("MCMXCIV")).toBe(1994);
    expect(convertRomanToInteger("MMMCMXCIX")).toBe(3999);
  });

  // 测试小的罗马数字
  test("handles small Roman numerals", () => {
    expect(convertRomanToInteger("I")).toBe(1);
    expect(convertRomanToInteger("II")).toBe(2);
    expect(convertRomanToInteger("III")).toBe(3);
    expect(convertRomanToInteger("V")).toBe(5);
  });

  // 测试无效输入的情况
  test("handles invalid inputs", () => {
    expect(() => convertRomanToInteger("IIII")).toThrow(
      "Invalid Roman numeral input"
    );
    expect(() => convertRomanToInteger("")).toThrow(
      "Invalid Roman numeral input"
    );
    expect(() => convertRomanToInteger("MMMM")).toThrow(
      "Invalid Roman numeral input"
    );
    expect(() => convertRomanToInteger("VV")).toThrow(
      "Invalid Roman numeral input"
    );
  });

  // 测试不是罗马数字的字符
  test("throws an error for non-Roman numeral characters", () => {
    expect(() => convertRomanToInteger("A")).toThrow(
      "Invalid Roman numeral input"
    );
    expect(() => convertRomanToInteger("1")).toThrow(
      "Invalid Roman numeral input"
    );
    expect(() => convertRomanToInteger("#")).toThrow(
      "Invalid Roman numeral input"
    );
  });

  // 边界值测试
  test("handles edge cases", () => {
    expect(convertRomanToInteger("MMMCMXCIX")).toBe(3999);
  });
});
