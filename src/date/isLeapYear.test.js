// 引入要测试的函数
import { isLeapYear } from '.'; // 假设您的函数在dateUtils.js文件中

describe('isLeapYear', () => {
  // 测试普通年份
  test('returns false for non-leap years', () => {
    const nonLeapYears = [1900, 1901, 2100, 2105];
    nonLeapYears.forEach((year) => {
      expect(isLeapYear(year)).toBe(false);
    });
  });

  // 测试世纪年份（整百的年份）
  test('returns false for centurial years not divisible by 400', () => {
    const centurialYears = [1800, 1900, 2100];
    centurialYears.forEach((year) => {
      expect(isLeapYear(year)).toBe(false);
    });
  });

  // 测试4的倍数的年份
  test('returns true for leap years divisible by 4 but not by 100', () => {
    const leapYearsDivisibleBy4 = [2004, 2008, 2020];
    leapYearsDivisibleBy4.forEach((year) => {
      expect(isLeapYear(year)).toBe(true);
    });
  });

  // 测试400的倍数的年份
  test('returns true for leap years divisible by 400', () => {
    const leapYearsDivisibleBy400 = [1600, 2000, 2400];
    leapYearsDivisibleBy400.forEach((year) => {
      expect(isLeapYear(year)).toBe(true);
    });
  });

  // 测试负数年份
  test('handles negative years correctly', () => {
    // 根据规则，负数年份不适用闰年规则，但我们可以测试函数是否稳定返回预期结果
    expect(isLeapYear(-400)).toBe(false); // 通常不将负数视为闰年
    expect(isLeapYear(-4)).toBe(false);
  });

  // 测试小数年份
  test('returns false for decimal years', () => {
    // 闰年规则只适用于整数年份
    expect(isLeapYear(2000.5)).toBe(false);
  });
});