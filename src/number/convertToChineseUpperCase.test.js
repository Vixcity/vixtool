import { convertToChineseUpperCase } from ".";

// 开始测试套件
describe("convertToChineseUpperCase", () => {
  // 测试有效输入
  test("converts numbers to Chinese upper case correctly", () => {
    expect(convertToChineseUpperCase(0)).toBe("零");
    expect(convertToChineseUpperCase(1)).toBe("壹");
    expect(convertToChineseUpperCase(10)).toBe("壹拾");
    expect(convertToChineseUpperCase(11)).toBe("壹拾壹");
    expect(convertToChineseUpperCase(110)).toBe("壹佰壹拾");
    expect(convertToChineseUpperCase(1001)).toBe("壹仟零壹");
    expect(convertToChineseUpperCase(1000)).toBe("壹仟");
    expect(convertToChineseUpperCase(10000)).toBe("壹万");
    expect(convertToChineseUpperCase(100000000)).toBe("壹亿");
    expect(convertToChineseUpperCase(100110010)).toBe("壹亿零壹拾壹万零壹拾");
    expect(convertToChineseUpperCase(1234567890)).toBe(
      "壹拾贰亿叁仟肆佰伍拾陆万柒仟捌佰玖拾"
    );
  });

  // 测试特殊情况和边界值
  test("handles special cases and boundary conditions", () => {
    expect(convertToChineseUpperCase(20)).toBe("贰拾");
    expect(convertToChineseUpperCase(100)).toBe("壹佰");
    expect(convertToChineseUpperCase(10000)).toBe("壹万");
    expect(convertToChineseUpperCase(100000)).toBe("壹拾万");
    expect(convertToChineseUpperCase(100000000)).toBe("壹亿");
    expect(convertToChineseUpperCase(1000000000000)).toBe("壹兆");
    // 添加你的边界值测试案例
  });

  // 测试无效输入
  test('returns "Invalid input" for non-numeric inputs', () => {
    expect(convertToChineseUpperCase("test")).toBe("Invalid input");
    expect(convertToChineseUpperCase(null)).toBe("Invalid input");
    expect(convertToChineseUpperCase(undefined)).toBe("Invalid input");
    expect(convertToChineseUpperCase(NaN)).toBe("Invalid input");
    // 添加其他你认为应该验证的无效输入
  });

  // 测试连续零的处理
  test("handles continuous zeros correctly", () => {
    expect(convertToChineseUpperCase(10001)).toBe("壹万零壹");
    expect(convertToChineseUpperCase(100000010)).toBe("壹亿零壹拾");
    // 添加其他测试连续零的案例
  });

  // 测试节权位的零处理
  test("handles zeros in section units correctly", () => {
    expect(convertToChineseUpperCase(100000000)).toBe("壹亿");
    expect(convertToChineseUpperCase(1000000000000)).toBe("壹兆");
    // 添加其他测试节权位零的案例
  });

  // 测试输入为字符串的数字
  test("handles string number inputs correctly", () => {
    expect(convertToChineseUpperCase("123")).toBe("壹佰贰拾叁");
    expect(convertToChineseUpperCase("1001")).toBe("壹仟零壹");
    // 添加其他测试字符串数字输入的案例
  });

  // 测试非常规输入
  test("handles unconventional inputs correctly", () => {
    expect(convertToChineseUpperCase(-1)).toBe("Invalid input");
    expect(convertToChineseUpperCase(1.23)).toBe("Invalid input");
    // 添加其他测试非常规输入的案例
  });
});
