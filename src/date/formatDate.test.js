// 引入要测试的函数
import { formatDate } from "."; // 替换为实际的文件路径

describe("formatDate", () => {
  // 测试默认参数
  test("should use current date and time when no arguments are provided", () => {
    const now = new Date();
    const formattedDate = formatDate();
    expect(formattedDate).toEqual(now.toISOString().slice(0, 10)); // 假设format默认为YYYY-MM-DD
  });

  // 测试自定义日期
  test("should format a provided date", () => {
    const testDate = new Date("2024-06-12T12:34:56");
    const expected = "2024-06-12";
    const formattedDate = formatDate(testDate);
    expect(formattedDate).toEqual(expected);
  });

  // 测试自定义格式
  test("should format date according to the provided format string", () => {
    const testDate = new Date("2024-06-12T12:34:56");
    const formatStr = "YYYY-MM-DD HH:mm:ss";
    const expected = "2024-06-12 12:34:56";
    const formattedDate = formatDate(testDate, formatStr);
    expect(formattedDate).toEqual(expected);
  });

  // 测试无效日期对象
  test("should throw an error when an invalid date object is provided", () => {
    const invalidDate = new Date("not-a-date");
    expect(() => formatDate(invalidDate)).toThrow(
      "Invalid date provided. Falling back to current date and time."
    );
  });

  // 测试月份的补零
  test("should pad single digit months with a leading zero", () => {
    const testDate = new Date("2024-01-12T12:34:56"); // January
    const expected = "2024-01-12";
    const formattedDate = formatDate(testDate);
    expect(formattedDate).toEqual(expected);
  });

  // 测试12小时制的时间格式
  test("should format time in 12-hour format when using hh and a", () => {
    const testDate = new Date("2024-06-12T12:34:56"); // Noon
    const formatStr = "hh:mm:ss a";
    const expected = "12:34:56 PM";
    const formattedDate = formatDate(testDate, formatStr);
    expect(formattedDate).toEqual(expected);
  });

  // 测试24小时制的时间格式
  test("should format time in 24-hour format when using HH", () => {
    const testDate = new Date("2024-06-12T00:34:56"); // Midnight
    const formatStr = "HH:mm:ss";
    const expected = "00:34:56";
    const formattedDate = formatDate(testDate, formatStr);
    expect(formattedDate).toEqual(expected);
  });
});
