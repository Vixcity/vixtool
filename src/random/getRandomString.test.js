import { getRandomString } from ".";

describe("getRandomString", () => {
  // 测试默认长度的字符串生成
  test("generates a random string of default length 10", () => {
    const str = getRandomString();
    expect(str).toHaveLength(10);
  });

  // 测试特定长度的字符串生成
  test("generates a random string of a specific length", () => {
    const length = 20;
    const str = getRandomString(length);
    expect(str).toHaveLength(length);
  });

  // 测试生成的字符串只包含指定的字符
  test("generates a string with only specified characters", () => {
    const str = getRandomString();
    const allowedChars =
      "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[{]};:'\\\"|,<.>/?`~";
    for (let char of str) {
      expect(allowedChars).toContain(char);
    }
  });

  // 测试长度为0时的输出
  test("generates an empty string when length is 0", () => {
    const str = getRandomString(0);
    expect(str).toBe("");
  });

  // 测试边界条件：非常大的长度
  test("handles very large lengths", () => {
    const length = 1000;
    const str = getRandomString(length);
    expect(str).toHaveLength(length);
  });

  // 测试边界条件：负数长度
  test("generates an empty string when length is negative", () => {
    const str = getRandomString(-1);
    expect(str).toBe("");
  });

  // 附加测试：确保传入非数字参数时函数的行为（根据实际函数的错误处理逻辑）
  test("returns an empty string or throws an error when length is not a number", () => {
    // 如果你期望函数抛出错误，可以使用以下代码
    expect(() => getRandomString("abc")).toThrow("args must be a number");
  });
});
