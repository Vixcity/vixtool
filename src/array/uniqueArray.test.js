import { uniqueArray } from ".";

describe("uniqueArray function tests", () => {
  // 应该返回唯一的数字数组
  test("should return only unique numbers in an array", () => {
    const input = [1, 2, 3, 2, 1];
    const expected = [1, 2, 3];
    expect(uniqueArray(input)).toEqual(expected);
  });

  // 应该返回唯一的字符串数组
  test("should return only unique strings in an array", () => {
    const input = ["apple", "banana", "apple", "orange"];
    const expected = ["apple", "banana", "orange"];
    expect(uniqueArray(input)).toEqual(expected);
  });

  // 应该返回唯一的对象数组，基于对象的某个属性
  test("should return only unique objects based on a key", () => {
    const input = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
      { id: 1, name: "John" },
    ];
    const expected = [
      { id: 1, name: "John" },
      { id: 2, name: "Jane" },
    ];
    expect(uniqueArray(input, "id")).toEqual(expected);
  });

  // 应该返回唯一的数组
  test("should return only unique arrays", () => {
    const input = [
      [1, 2],
      [2, 3],
      [1, 2],
    ];
    const expected = [
      [1, 2],
      [2, 3],
    ];
    expect(uniqueArray(input)).toEqual(expected);
  });

  // 应该抛出错误，如果输入不是数组
  test("should throw an error if the input is not an array", () => {
    const input = "not an array";
    expect(() => uniqueArray(input)).toThrow(
      'The "arr" parameter is required and must be an array.'
    );
  });

  // 应该返回空数组，如果输入数组为空
  test("should return an empty array if input is an empty array", () => {
    const input = [];
    const expected = [];
    expect(uniqueArray(input)).toEqual(expected);
  });

  // 当其他值不同时，应仅保留具有相同keyForObjects值的对象的第一次出现
  test("should keep only the first occurrence of objects with the same keyForObjects value when other values differ", () => {
    const input = [
      { id: 1, name: "John", age: 30 },
      { id: 2, name: "Jane", age: 25 },
      { id: 1, name: "Johnny", age: 30 }, // 同id不同name和age
    ];
    const expected = [
      { id: 1, name: "John", age: 30 },
      { id: 2, name: "Jane", age: 25 },
    ];
    expect(uniqueArray(input, "id")).toEqual(expected);
  });

  // 应该保持元素顺序
  test("should maintain the initial order of elements after deduplication", () => {
    const input = [
      { id: 1, name: "John" },
      { id: 3, name: "Alice" },
      { id: 2, name: "Jane" },
      { id: 1, name: "John" }, // 重复的对象
      { id: 3, name: "Alice" }, // 又一个重复的对象
    ];
    const expected = [
      { id: 1, name: "John" },
      { id: 3, name: "Alice" },
      { id: 2, name: "Jane" },
    ];
    expect(uniqueArray(input, "id")).toEqual(expected);
  });
});
