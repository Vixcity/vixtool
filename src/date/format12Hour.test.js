import { format12Hour } from ".";

describe("format12Hour", () => {
  // 测试0点（24小时制）转换为12点（12小时制）
  test("converts 00 hours to 12", () => {
    expect(format12Hour(0)).toBe("12");
  });

  // 测试1点到11点（12小时制）
  test("formats hours from 1 to 11 correctly", () => {
    for (let hour = 1; hour <= 11; hour++) {
      expect(format12Hour(hour)).toBe(String(hour).padStart(2, "0"));
    }
  });

  // 测试12点（12小时制）
  test("recognizes 12 hours as 12", () => {
    expect(format12Hour(12)).toBe("12");
  });

  // 测试13点到23点（12小时制），转换为1点到11点PM
  test("converts hours from 13 to 23 to 1-11 PM", () => {
    for (let hour = 13; hour <= 23; hour++) {
      const expected = String(hour - 12).padStart(2, "0");
      expect(format12Hour(hour)).toBe(expected);
    }
  });

  // 测试负数小时
  test("handles negative hours", () => {
    // 假设函数设计为处理负数小时，例如 -1 转换为 11
    expect(format12Hour(-1)).toBe("11");
  });

  // 测试非整数小时
  test("handles non-integer hours", () => {
    // 假设函数设计为处理非整数小时，例如 10.5 转换为 10
    expect(format12Hour(10.5)).toBe("10");
  });

  // 测试非常大的小时数
  test("handles large hours values", () => {
    // 假设函数设计为处理非常大的小时数，例如 25 转换为 01
    expect(format12Hour(25)).toBe("01");
  });

  // 测试非常小的小时数
  test("handles very small hours values", () => {
    // 假设函数设计为处理非常小的小时数，例如 -25 转换为 11
    expect(format12Hour(-25)).toBe("11");
  });
});
