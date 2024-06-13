import { getRandomTimestamp } from ".";

describe("getRandomTimestamp", () => {
  const start = Date.now();
  const end = start + 100000; // 假设我们的结束时间戳是开始时间戳之后的100000毫秒

  // 测试返回的时间戳是否在指定的范围内
  test("returned timestamp should be within the specified range", () => {
    const randomTimestamp = getRandomTimestamp(start, end);
    expect(typeof randomTimestamp).toBe("number");
    expect(randomTimestamp).toBeGreaterThanOrEqual(start);
    expect(randomTimestamp).toBeLessThanOrEqual(end);
  });

  // 测试即使开始时间戳大于结束时间戳，函数也能正确处理
  test("should correctly handle cases where start timestamp is greater than end timestamp", () => {
    const reversedStart = end;
    const reversedEnd = start;
    const randomTimestamp = getRandomTimestamp(reversedStart, reversedEnd);
    expect(randomTimestamp).toBeGreaterThanOrEqual(start);
    expect(randomTimestamp).toBeLessThanOrEqual(end);
  });

  // 测试输入无效值时是否抛出错误
  test("should throw an error for invalid timestamp ranges", () => {
    // 输入非数字
    expect(() => getRandomTimestamp("start", "end")).toThrow(
      "Invalid timestamp range"
    );
    expect(() => getRandomTimestamp(null, null)).toThrow(
      "Invalid timestamp range"
    );
    expect(() => getRandomTimestamp(undefined, undefined)).toThrow(
      "Invalid timestamp range"
    );
  });

  // 测试函数是否每次调用都返回不同的随机时间戳
  test("should return a different timestamp on subsequent calls", () => {
    const timestamp1 = getRandomTimestamp(start, end);
    const timestamp2 = getRandomTimestamp(start, end);
    expect(timestamp1).not.toEqual(timestamp2);
  });
});
