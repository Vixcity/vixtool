import { filterArray } from ".";

describe("filterArray", () => {
  // 测试通过字符串查询过滤数组
  test("should filter array by string query", () => {
    const data = [{ name: "Alice" }, { name: "Bob" }, { name: "Charlie" }];
    const result = filterArray(data, "Bob", "name");
    expect(result).toEqual([{ name: "Bob" }]);
  });

  // 测试通过数组查询过滤数组
  test("should filter array by array query", () => {
    const data = [{ name: "Alice" }, { name: "Bob" }, { name: "Charlie" }];
    const result = filterArray(data, ["Alice", "Bob"], "name");
    expect(result).toEqual([{ name: "Alice" }, { name: "Bob" }]);
  });

  // 测试通过对象查询过滤数组
  test("should filter array by object query", () => {
    const data = [
      { name: "Alice", age: 30 },
      { name: "Bob", age: 25 },
      { name: "Charlie", age: 30 },
    ];
    const result = filterArray(data, { age: 30 }, "age");
    expect(result).toEqual([
      { name: "Alice", age: 30 },
      { name: "Charlie", age: 30 },
    ]);
  });

  // 测试当数据不是数组时抛出错误
  test("should throw error when data is not an array", () => {
    expect(() => filterArray("not an array", "query", "key")).toThrow(
      "The first argument must be an array."
    );
  });

  // 测试当查询不是字符串、数组或对象时抛出错误
  test("should throw error when query is not a string, array, or object", () => {
    const data = [{ name: "Alice" }, { name: "Bob" }, { name: "Charlie" }];
    expect(() => filterArray(data, 123, "name")).toThrow(
      "The second argument must be a string, an array, or an object."
    );
  });

  // 测试当使用字符串或数组查询时未提供键时抛出错误
  test("should throw error when key is not provided for string or array query", () => {
    const data = [{ name: "Alice" }, { name: "Bob" }, { name: "Charlie" }];
    expect(() => filterArray(data, "Alice")).toThrow(
      "A key is required when querying with a string or an array."
    );
  });

  // 测试当使用对象查询时未提供键时抛出错误
  test("should throw error when key is not provided for object query", () => {
    const data = [
      { name: "Alice", age: 30 },
      { name: "Bob", age: 25 },
      { name: "Charlie", age: 30 },
    ];
    expect(() => filterArray(data, { age: 30 })).toThrow(
      "A key is required when querying with an object."
    );
  });

  // 测试当没有匹配项时返回空数组
  test("should return empty array when no matches found", () => {
    const data = [{ name: "Alice" }, { name: "Bob" }, { name: "Charlie" }];
    const result = filterArray(data, "Dave", "name");
    expect(result).toEqual([]);
  });

  // 测试当 data 为空数组时的行为
  test("should return empty array when data is empty", () => {
    const result = filterArray([], "Alice", "name");
    expect(result).toEqual([]);
  });

  // 测试当 query 为空字符串时的行为
  test("should handle empty string query", () => {
    const data = [{ name: "Alice" }, { name: "Bob" }, { name: "Charlie" }];
    const result = filterArray(data, "", "name");
    expect(result).toEqual([]); // 或根据实际逻辑调整预期结果
  });

  // 测试当 key 不存在于对象中时的行为
  test("should handle key not existing in objects", () => {
    const data = [
      { name: "Alice", age: 30 },
      { name: "Bob", age: 25 },
      { name: "Charlie" },
    ];
    const result = filterArray(data, "Bob", "address");
    expect(result).toEqual([]);
  });

  // 测试当 query 包含特殊字符时的行为
  test("should handle query with special characters", () => {
    const data = [{ name: "Alice" }, { name: "Bob" }, { name: "Charlie" }];
    const result = filterArray(data, "?Bob!", "name");
    expect(result).toEqual([{ name: "Bob" }]);
  });

  // 测试当 key 是一个非常长的字符串时的行为
  test("should handle long key strings", () => {
    const data = [
      { verylongkey: "Alice" },
      { verylongkey: "Bob" },
      { verylongkey: "Charlie" },
    ];
    const result = filterArray(data, "Bob", "verylongkey");
    expect(result).toEqual([{ verylongkey: "Bob" }]);
  });
});
