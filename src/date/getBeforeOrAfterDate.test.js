// 引入要测试的函数
import { getBeforeOrAfterDate } from ".";

describe("getBeforeOrAfterDate", () => {
  // 测试字符串日期的基本功能
  test("calculates the date before n days given a string date", () => {
    const dateString = "2024-01-01";
    const daysBefore = 10;
    const expectedDate = new Date("2023-12-22"); // 2024-01-01 往前推10天
    const result = getBeforeOrAfterDate(dateString, daysBefore, "before");
    expect(result).toEqual(expectedDate.toISOString().split("T")[0]); // 比较日期部分
  });

  // 测试Date对象的基本功能
  test("calculates the date after n days given a Date object", () => {
    const date = new Date("2024-01-01");
    const daysAfter = 10;
    const expectedDate = new Date("2024-01-11");
    const result = getBeforeOrAfterDate(date, daysAfter, "after");
    expect(result).toEqual(expectedDate.toISOString().split("T")[0]); // 比较日期部分
  });

  // 测试默认参数（当前日期和0天）
  test("returns today's date when default parameters are used", () => {
    const today = new Date().toISOString().split("T")[0];
    const result = getBeforeOrAfterDate();
    expect(result).toEqual(today);
  });

  // 测试特殊日子的计算，例如2月28日到2月29日
  test("correctly handles leap year day calculations", () => {
    const startDate = new Date(2024, 1, 28); // 2月28日
    const result = getBeforeOrAfterDate(startDate, 1, "after");
    expect(result).toEqual("2024-02-29"); // 比较日期部分
  });

  // 测试负数天数的情况
  test("calculates the date correctly for negative n", () => {
    const date = new Date("2024-01-05");
    const daysBefore = -3; // 实际上应该往后推3天
    const expectedDate = new Date("2024-01-08");
    const result = getBeforeOrAfterDate(date, daysBefore, "before");
    expect(result).toEqual(expectedDate.toISOString().split("T")[0]); // 比较日期部分
  });

  // 测试天数为0的情况
  test("returns the same date when n is 0", () => {
    const date = new Date("2024-01-01");
    const result = getBeforeOrAfterDate(date, 0, "before");
    expect(result).toEqual(date.toISOString().split("T")[0]); // 比较日期部分
  });

  // 测试无效的日期字符串
  test("throws an error for invalid date strings", () => {
    expect(() => {
      getBeforeOrAfterDate("this is not a date");
    }).toThrow("Invalid date string");
  });

  // 测试非字符串或Date对象的输入
  test("throws an error for invalid input types", () => {
    expect(() => {
      getBeforeOrAfterDate(null);
    }).toThrow("Invalid date input. Must be a string or a Date object");
  });

  // 测试无效的类型参数
  test("throws an error for invalid type parameters", () => {
    expect(() => {
      getBeforeOrAfterDate(new Date(), 5, "invalid");
    }).toThrow("Invalid date type. Must be 'before' or 'after'");
  });
});
