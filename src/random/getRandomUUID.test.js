import { getRandomUUID } from ".";

describe("getRandomUUID", () => {
  // 正则表达式匹配UUID v4的格式
  const uuidV4Regex =
    /^[0-9a-f]{8}-[0-9a-f]{4}-4[0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

  // 测试是否返回一个字符串
  test("should return a string", () => {
    const uuid = getRandomUUID();
    expect(typeof uuid).toBe("string");
  });

  // 测试返回的字符串是否符合UUID v4格式
  test("should return a valid UUID v4 format", () => {
    const uuid = getRandomUUID();
    expect(uuid).toMatch(uuidV4Regex);
  });

  // 测试生成多个UUID是否有重复
  test("should generate unique UUIDs in multiple invocations", () => {
    const uuidSet = new Set();
    const iterations = 1000;
    for (let i = 0; i < iterations; i++) {
      uuidSet.add(getRandomUUID());
    }
    expect(uuidSet.size).toBe(iterations);
  });
});
