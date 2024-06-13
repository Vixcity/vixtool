import { getRandomBool } from ".";

describe("getRandomBool", () => {
  // 测试返回值是布尔值
  test("should return a boolean value", () => {
    const value = getRandomBool();
    expect(typeof value).toBe("boolean");
  });

  // 测试多次调用结果是否包含true和false
  test("should return both true and false over multiple invocations", () => {
    const results = new Array(100).fill(null).map(() => getRandomBool());
    const hasTrue = results.includes(true);
    const hasFalse = results.includes(false);
    expect(hasTrue).toBe(true);
    expect(hasFalse).toBe(true);
  });

  // 测试在多次调用中true和false的分布大致相等
  test("should return a roughly equal distribution of true and false over many invocations", () => {
    const results = new Array(1000).fill(null).map(() => getRandomBool());
    const trueCount = results.filter((value) => value === true).length;
    const falseCount = results.filter((value) => value === false).length;

    // 检查true和false的数量大致相等，这里的差异阈值可以根据需要调整
    const acceptableDifference = results.length * 0.1; // 10%的差异
    expect(Math.abs(trueCount - falseCount)).toBeLessThanOrEqual(
      acceptableDifference
    );
  });
});
