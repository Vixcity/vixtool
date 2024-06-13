import { capitalizeWords } from ".";

describe("capitalizeWords", () => {
  // 测试空字符串
  test("returns an empty string if provided string is empty", () => {
    expect(capitalizeWords("")).toBe("");
  });

  // 测试单个单词
  test("capitalizes a single word", () => {
    expect(capitalizeWords("hello")).toBe("Hello");
  });

  // 测试多个单词
  test("capitalizes the first letter of each word in a string", () => {
    expect(capitalizeWords("hello world")).toBe("Hello World");
  });

  // 测试包含混合大小写的字符串
  test("converts the rest of the characters to lower case", () => {
    expect(capitalizeWords("hElLO wORLD")).toBe("Hello World");
  });

  // 测试包含额外空格的字符串
  test("handles extra spaces between words", () => {
    expect(capitalizeWords(" hello  world ")).toBe("Hello  World");
  });

  // 测试包含特殊字符的字符串
  test("handles strings with special characters", () => {
    expect(capitalizeWords("hello-world, again!")).toBe("Hello-world, Again!");
  });

  // 测试全大写的字符串
  test("handles strings that are in all caps", () => {
    expect(capitalizeWords("HELLO WORLD")).toBe("Hello World");
  });

  // 测试包含数字和标点符号的字符串
  test("handles strings with numbers and punctuation", () => {
    expect(capitalizeWords("123 hello, how are you?")).toBe(
      "123 Hello, How Are You?"
    );
  });
});
