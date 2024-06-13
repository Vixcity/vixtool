import { getRandomElement } from ".";

describe("getRandomElement", () => {
  // 测试正常情况
  test("should return an element from the array", () => {
    const array = [1, 2, 3, 4, 5];
    const element = getRandomElement(array);
    expect(array).toContain(element);
  });

  // 测试空数组
  test("should return undefined when the array is empty", () => {
    const array = [];
    const element = getRandomElement(array);
    expect(element).toBeUndefined();
  });

  // 测试非数组输入
  test("should return undefined when the input is not an array", () => {
    const notArray = "not an array";
    const element = getRandomElement(notArray);
    expect(element).toBeUndefined();
  });

  // 测试数组包含不同类型的元素
  test("should handle arrays with different types of elements", () => {
    const array = [42, "string", null, undefined, {}, []];
    const element = getRandomElement(array);
    expect(array).toContain(element);
  });

  // 测试确保随机性
  test("should have some degree of randomness", () => {
    const array = [1, 2, 3, 4, 5];
    const results = new Array(100)
      .fill(null)
      .map(() => getRandomElement(array));
    const uniqueResults = new Set(results);
    expect(uniqueResults.size).toBeGreaterThan(1);
  });
});
