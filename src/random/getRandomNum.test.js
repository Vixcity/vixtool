import { getRandomNum } from ".";

describe("getRandomNum", () => {
  // 测试正常情况
  test("generates a random number within the default range", () => {
    const number = getRandomNum();
    expect(number).toBeGreaterThanOrEqual(0);
    expect(number).toBeLessThanOrEqual(100);
  });

  // 测试指定范围
  test("generates a random number within a specified range", () => {
    const min = 10;
    const max = 50;
    const number = getRandomNum(min, max);
    expect(number).toBeGreaterThanOrEqual(min);
    expect(number).toBeLessThanOrEqual(max);
  });

  // 测试最小值和最大值相等的情况
  test("generates the same number when min and max values are equal", () => {
    const number = getRandomNum(5, 5);
    expect(number).toBe(5);
  });

  // 测试字符串输入
  test("handles string representations of numbers correctly", () => {
    const number = getRandomNum("1", "10");
    expect(number).toBeGreaterThanOrEqual(1);
    expect(number).toBeLessThanOrEqual(10);
  });

  // 测试无效的数值
  test("throws an error when arguments are not valid numbers or numeric strings", () => {
    expect(() => getRandomNum("a", 10)).toThrow(
      "Both arguments must be numbers or numeric strings"
    );
    expect(() => getRandomNum(10, "b")).toThrow(
      "Both arguments must be numbers or numeric strings"
    );
  });

  // 测试最小值大于最大值的情况
  test("warns and swaps values when min is greater than max", () => {
    const min = 20;
    const max = 10;
    const number = getRandomNum(min, max);

    expect(number).toBeGreaterThanOrEqual(max);
    expect(number).toBeLessThanOrEqual(min);
  });
});
