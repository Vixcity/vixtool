import { separateNumberByThousands } from "."; // 替换成实际的模块路径

describe("separateNumberByThousands", () => {
  // 测试有效的数值输入
  test("correctly formats positive integers", () => {
    expect(separateNumberByThousands(1234567)).toBe("1,234,567");
  });

  test("correctly formats negative integers", () => {
    expect(separateNumberByThousands(-1234567)).toBe("-1,234,567");
  });

  test("correctly formats numbers with decimal places", () => {
    expect(separateNumberByThousands(12345.6789)).toBe("12,345.6789");
  });

  // 测试非数值输入
  test('returns "Invalid input" for non-numeric inputs', () => {
    expect(separateNumberByThousands("test")).toBe("Invalid input");
    expect(separateNumberByThousands(null)).toBe("Invalid input");
    expect(separateNumberByThousands(undefined)).toBe("Invalid input");
  });

  // 额外的无效输入测试
  test('returns "Invalid input" for objects and arrays', () => {
    expect(separateNumberByThousands({})).toBe("Invalid input");
    expect(separateNumberByThousands([])).toBe("Invalid input");
  });

  // 测试使用不同的分隔符
  test("allows different separators", () => {
    expect(separateNumberByThousands(1234567, " ")).toBe("1 234 567");
    expect(separateNumberByThousands(1234567, ".")).toBe("1.234.567");
    expect(separateNumberByThousands(1234567, "-")).toBe("1-234-567");
  });

  // 测试小数输入
  test("handles numbers with decimal points", () => {
    expect(separateNumberByThousands(1234.5678)).toBe("1,234.5678");
    expect(separateNumberByThousands(-1234.5678, ".")).toBe("-1.234.5678");
  });

  // 测试零和一位数
  test("handles zero and single-digit numbers", () => {
    expect(separateNumberByThousands(0)).toBe("0");
    expect(separateNumberByThousands(5)).toBe("5");
  });

  // 测试非常大的数字
  test("handles very large numbers", () => {
    expect(separateNumberByThousands(123456789012345)).toBe(
      "123,456,789,012,345"
    );
  });

  // 测试非常小的数字
  test("handles very small negative numbers", () => {
    expect(separateNumberByThousands(-0.1234)).toBe("-0.1234");
  });

  // 测试非常规数字字符串
  test("handles numeric strings", () => {
    expect(separateNumberByThousands("123456")).toBe("123,456");
  });

  // 测试带有非数字字符的字符串
  test('returns "Invalid input" for strings containing non-numeric characters', () => {
    expect(separateNumberByThousands("123abc456")).toBe("Invalid input");
  });
});
