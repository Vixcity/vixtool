import { getRandomBinary } from ".";

describe("getRandomBinary", () => {
  // 测试函数是否生成指定长度的二进制字符串
  test("should generate a binary string of the specified length", () => {
    const length = 8;
    const binaryString = getRandomBinary(length);
    expect(binaryString.length).toBe(length);
  });

  // 测试函数是否在输入非正数时抛出错误
  test("should throw an error for non-positive length", () => {
    expect(() => getRandomBinary(0)).toThrow(
      "Length must be a positive number."
    );
    expect(() => getRandomBinary(-5)).toThrow(
      "Length must be a positive number."
    );
    expect(() => getRandomBinary("abc")).toThrow(
      "Length must be a positive number."
    );
  });

  // 测试函数是否生成有效的二进制字符串（只包含 0 和 1）
  test("should generate a valid binary string", () => {
    const length = 10;
    const binaryString = getRandomBinary(length);
    for (let i = 0; i < binaryString.length; i++) {
      expect(binaryString[i]).toMatch(/[01]/);
    }
  });

  // 测试函数是否每次调用都生成不同的二进制字符串
  test("should generate different binary strings on subsequent calls", () => {
    const length = 5;
    const firstCall = getRandomBinary(length);
    const secondCall = getRandomBinary(length);
    expect(firstCall).not.toBe(secondCall);
  });
});
