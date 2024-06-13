import { getRandomEnum } from ".";

describe("getRandomEnum", () => {
  // 模拟一个枚举对象
  const Color = {
    RED: "red",
    GREEN: "green",
    BLUE: "blue",
  };

  // 测试函数是否返回枚举对象中的一个有效值
  test("should return a valid enum value", () => {
    const randomColor = getRandomEnum(Color);
    expect(Object.values(Color)).toContain(randomColor);
  });

  // 测试当枚举对象为空时，函数是否抛出错误
  test("should throw an error when the enum is empty", () => {
    const emptyEnum = {};
    expect(() => getRandomEnum(emptyEnum)).toThrow(
      "The enumeration cannot be empty."
    );
  });

  // 测试函数是否每次调用都可能返回不同的枚举值
  test("should potentially return a different enum value on subsequent calls", () => {
    const firstCall = getRandomEnum(Color);
    const secondCall = getRandomEnum(Color);
    // 注意：此测试有可能失败，因为随机性也可能返回相同的值
    expect(firstCall).not.toBe(secondCall);
  });
});
