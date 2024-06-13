// 引入要测试的函数和辅助函数
import { calculateMonthsYearsDifference } from "."; // 假设您的函数在dateUtils.js文件中

describe("calculateMonthsYearsDifference", () => {
  // 测试相同年份，不同月份
  test("calculates months and years difference within the same year", () => {
    const startDate = new Date(2024, 0, 1); // January 1, 2024
    const endDate = new Date(2024, 11, 31); // December 31, 2024
    const result = calculateMonthsYearsDifference(startDate, endDate);
    expect(result).toEqual({ months: 11, years: 0 });
  });

  // 测试跨年情况
  test("calculates months and years difference across years", () => {
    const startDate = new Date(2024, 0, 1); // January 1, 2024
    const endDate = new Date(2025, 0, 1); // January 1, 2025
    const result = calculateMonthsYearsDifference(startDate, endDate);
    expect(result).toEqual({ months: 12, years: 1 }); // 从2024年1月1日到2025年1月1日是1年
  });

  // 测试闰年二月29日
  test("handles leap year February 29 correctly", () => {
    const startDate = new Date(2024, 1, 1); // February 1, 2024
    const endDate = new Date(2024, 2, 1); // March 1, 2024
    const result = calculateMonthsYearsDifference(startDate, endDate);
    expect(result).toEqual({ months: 1, years: 0 }); // 即使经过2月29日，也只算一个月
  });

  // 测试非闰年二月末
  test("handles non-leap year February end correctly", () => {
    const startDate = new Date(2023, 1, 1); // February 1, 2023
    const endDate = new Date(2023, 2, 1); // March 1, 2023
    const result = calculateMonthsYearsDifference(startDate, endDate);
    expect(result).toEqual({ months: 1, years: 0 });
  });

  // 测试日期相同时
  test("returns zero months and years for the same date", () => {
    const date = new Date(2024, 0, 1); // January 1, 2024
    const result = calculateMonthsYearsDifference(date, date);
    expect(result).toEqual({ months: 0, years: 0 });
  });

  // 测试结束日期在开始日期之前
  test("handles endDate before startDate correctly", () => {
    const startDate = new Date(2024, 0, 1); // January 1, 2024
    const endDate = new Date(2023, 11, 31); // December 31, 2023
    const result = calculateMonthsYearsDifference(startDate, endDate);
    expect(result).toEqual({ months: -1, years: -1 }); // 结束日期在开始日期之前，应返回0
  });
});
