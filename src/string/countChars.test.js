import { countChars } from ".";

describe("countChars", () => {
  // 测试空字符串的情况
  test("returns an empty object for an empty string", () => {
    expect(countChars("")).toEqual({});
  });

  // 测试只有一个字符的字符串
  test("counts a single character correctly", () => {
    expect(countChars("a")).toEqual({ a: 1 });
  });

  // 测试多个字符出现同样次数的情况
  test("counts multiple characters appearing the same number of times correctly", () => {
    expect(countChars("abab")).toEqual({ a: 2, b: 2 });
  });

  // 测试字符出现次数不同的情况
  test("counts characters appearing different number of times correctly", () => {
    expect(countChars("aabbc")).toEqual({ a: 2, b: 2, c: 1 });
  });

  // 测试包含特殊字符的字符串
  test("counts a string with special characters correctly", () => {
    expect(countChars("a$bb c!")).toEqual({
      a: 1,
      $: 1,
      b: 2,
      " ": 1,
      c: 1,
      "!": 1,
    });
  });

  // 测试包含数字的字符串
  test("counts a string with numbers correctly", () => {
    expect(countChars("a1b2b3")).toEqual({ a: 1, 1: 1, b: 2, 2: 1, 3: 1 });
  });

  // 测试大小写敏感性
  test("is case sensitive", () => {
    expect(countChars("aAbB")).toEqual({ a: 1, A: 1, b: 1, B: 1 });
  });
});
