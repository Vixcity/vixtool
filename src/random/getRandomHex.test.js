import { getRandomHex } from ".";

describe("getRandomHex", () => {
  // 测试函数是否生成指定长度的十六进制字符串
  test("should generate a hex string of the specified length", () => {
    const length = 8;
    const hexString = getRandomHex(length);
    expect(hexString.length).toBe(length);
  });

  // 测试函数是否在输入非正数时抛出错误
  test("should throw an error for non-positive length", () => {
    expect(() => getRandomHex(0)).toThrow("Length must be a positive number.");
    expect(() => getRandomHex(-5)).toThrow("Length must be a positive number.");
    expect(() => getRandomHex("abc")).toThrow(
      "Length must be a positive number."
    );
  });

  // 测试生成的字符串是否为有效的十六进制字符串
  test("should generate a valid hex string", () => {
    const length = 10;
    const hexString = getRandomHex(length);
    expect(hexString).toMatch(/^[0-9a-f]+$/);
  });

  // 测试函数是否每次调用都可能生成不同的十六进制字符串
  test("should potentially generate different hex strings on subsequent calls", () => {
    const length = 5;
    const firstCall = getRandomHex(length);
    const secondCall = getRandomHex(length);
    // 注意：此测试有可能失败，因为随机性也可能返回相同的结果
    expect(firstCall).not.toBe(secondCall);
  });
});
