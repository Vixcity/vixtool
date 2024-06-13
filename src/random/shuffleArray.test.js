import { shuffleArray } from ".";

describe("shuffleArray", () => {
  const originalArray = [1, 2, 3, 4, 5];

  // 测试打乱后的数组长度是否与原数组相同
  test("shuffled array should have the same length as original", () => {
    const shuffled = shuffleArray(originalArray);
    expect(shuffled).toHaveLength(originalArray.length);
  });

  // 测试打乱后的数组是否包含原数组的所有元素
  test("shuffled array should contain all elements from the original array", () => {
    const shuffled = shuffleArray(originalArray);
    originalArray.forEach((element) => {
      expect(shuffled).toContain(element);
    });
  });

  // 测试函数是否返回一个新的数组实例
  test("should return a new array instance", () => {
    const shuffled = shuffleArray(originalArray);
    expect(shuffled).not.toBe(originalArray);
  });

  // 测试非数组参数是否导致函数抛出错误
  test("should throw an error if input is not an array", () => {
    expect(() => shuffleArray("not an array")).toThrow();
    expect(() => shuffleArray(123)).toThrow();
    expect(() => shuffleArray({})).toThrow();
    expect(() => shuffleArray(null)).toThrow();
    expect(() => shuffleArray(undefined)).toThrow();
  });

  // （可选）测试多次调用函数后，结果是否足够随机
  test("should be sufficiently random", () => {
    const resultSets = Array.from({ length: 1000 }, () =>
      shuffleArray(originalArray).join()
    );
    const uniqueResults = new Set(resultSets);
    // 如果随机性足够好，对于1000次随机打乱，应该有多个唯一的结果
    expect(uniqueResults.size).toBeGreaterThan(1);
  });
});
