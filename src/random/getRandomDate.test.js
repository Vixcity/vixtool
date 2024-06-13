import { getRandomDate } from ".";

describe("getRandomDate", () => {
  const start = new Date(2020, 0, 1); // 2020年1月1日
  const end = new Date(2021, 0, 1); // 2021年1月1日

  // 测试返回的日期是否在指定的范围内
  test("returned date should be within the specified range", () => {
    const randomDate = getRandomDate(start, end);
    expect(randomDate).toBeInstanceOf(Date);
    expect(randomDate.getTime()).toBeGreaterThanOrEqual(start.getTime());
    expect(randomDate.getTime()).toBeLessThanOrEqual(end.getTime());
  });

  // 测试输入无效值时是否抛出错误
  test("should throw an error for invalid date ranges", () => {
    // 结束日期在开始日期之前
    expect(() => getRandomDate(end, start)).toThrow("Invalid date range");
    // 输入非日期对象
    expect(() => getRandomDate("2020-01-01", "2021-01-01")).toThrow(
      "Invalid date range"
    );
    expect(() => getRandomDate(123, 456)).toThrow("Invalid date range");
    expect(() => getRandomDate(null, null)).toThrow("Invalid date range");
    expect(() => getRandomDate(undefined, undefined)).toThrow(
      "Invalid date range"
    );
  });

  // 测试返回的日期是否是新的实例，而不是输入的开始或结束日期的引用
  test("returned date should be a new instance not a reference to start or end date", () => {
    const randomDate = getRandomDate(start, end);
    expect(randomDate).not.toBe(start);
    expect(randomDate).not.toBe(end);
  });
});
