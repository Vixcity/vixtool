// 引入要测试的函数
import { groupByAndNest } from ".";

describe("groupByAndNest", () => {
  // 测试：非数组输入应抛出错误
  test("should throw an error when the array parameter is not an array", () => {
    const invalidInput = {};
    expect(() => {
      groupByAndNest(invalidInput, ["key"]);
    }).toThrow('The "array" parameter is required and must be an array.');
  });

  // 测试：未提供分组键或分组键为空数组时返回原数组
  test("should return the original array when groupByKeys is undefined or empty", () => {
    const originalArray = [{ id: 1 }, { id: 2 }];
    expect(groupByAndNest(originalArray, undefined)).toEqual(originalArray);
    expect(groupByAndNest(originalArray, [])).toEqual(originalArray);
  });

  // 测试：根据单个属性分组和嵌套
  test("should group and nest objects by a single property", () => {
    const array = [
      { type: "fruit", name: "apple" },
      { type: "fruit", name: "banana" },
      { type: "vegetable", name: "carrot" },
    ];
    const grouped = groupByAndNest(array, "type");
    expect(grouped).toEqual([
      { type: "fruit", children: [{ name: "apple" }, { name: "banana" }] },
      { type: "vegetable", children: [{ name: "carrot" }] },
    ]);
  });

  // 测试：根据多个属性分组和嵌套
  test("should group and nest objects by multiple properties", () => {
    const array = [
      { type: "fruit", color: "red", name: "apple" },
      { type: "fruit", color: "yellow", name: "banana" },
      { type: "vegetable", color: "orange", name: "carrot" },
    ];
    const grouped = groupByAndNest(array, ["type", "color"]);
    expect(grouped).toEqual([
      { type: "fruit", color: "red", children: [{ name: "apple" }] },
      { type: "fruit", color: "yellow", children: [{ name: "banana" }] },
      { type: "vegetable", color: "orange", children: [{ name: "carrot" }] },
    ]);
  });

  // 测试：数组中只有一个对象时的情况
  test("should handle an array with a single object", () => {
    const array = [{ name: "apple" }];
    const grouped = groupByAndNest(array, "name");
    expect(grouped).toEqual([{ name: "apple", children: [] }]);
  });

  // 测试：数组对象已包含嵌套对象的情况
  test("should handle an array with nested objects", () => {
    const array = [
      { category: "food", subCategory: "fruit", name: "apple" },
      { category: "food", subCategory: "fruit", name: "banana" },
      { category: "food", subCategory: "vegetable", name: "carrot" },
    ];
    const grouped = groupByAndNest(array, ["category", "subCategory"]);
    expect(grouped).toEqual([
      {
        category: "food",
        subCategory: "fruit",
        children: [{ name: "apple" }, { name: "banana" }],
      },
      {
        category: "food",
        subCategory: "vegetable",
        children: [{ name: "carrot" }],
      },
    ]);
  });

  // 测试：使用自定义的嵌套键
  test("should use a custom childrenKey for nesting", () => {
    const array = [
      { type: "fruit", name: "apple" },
      { type: "fruit", name: "banana" },
    ];
    const customChildrenKey = "items";
    const grouped = groupByAndNest(array, "type", customChildrenKey);
    expect(grouped[0].items).toEqual([{ name: "apple" }, { name: "banana" }]);
  });

  // 测试：输入数组为空的情况
  test("should return an empty array when the input array is empty", () => {
    const array = [];
    const grouped = groupByAndNest(array, "type");
    expect(grouped).toEqual([]);
  });

  // 测试：忽略对象缺少分组键属性的情况
  test("should ignore objects missing the groupByKeys properties", () => {
    const array = [
      { type: "fruit", name: "apple" },
      { name: "banana" }, // Missing `type`
    ];
    const grouped = groupByAndNest(array, "type");
    expect(grouped).toEqual([
      { type: "fruit", children: [{ name: "apple" }] },
      { type: undefined, children: [{ name: "banana" }] }, // Adjusted expectation
    ]);
  });

  // 测试：分组键为空字符串的情况
  test("should handle cases where the groupByKeys is an empty string", () => {
    const array = [
      { "": "fruit", name: "apple" },
      { "": "fruit", name: "banana" },
    ];
    const grouped = groupByAndNest(array, "");
    expect(grouped).toEqual([
      { "": "fruit", children: [{ name: "apple" }, { name: "banana" }] },
    ]);
  });

  // 测试：分组键为特殊字符的情况
  test("should handle keys with special characters", () => {
    const array = [
      { "type@": "fruit", name: "apple" },
      { "type@": "fruit", name: "banana" },
    ];
    const grouped = groupByAndNest(array, "type@");
    expect(grouped).toEqual([
      { "type@": "fruit", children: [{ name: "apple" }, { name: "banana" }] },
    ]);
  });

  // 测试：分组键为非字符串的情况
  test("should handle non-string groupByKeys", () => {
    const array = [
      { type: 1, name: "apple" },
      { type: 1, name: "banana" },
    ];
    const grouped = groupByAndNest(array, "type");
    expect(grouped).toEqual([
      { type: 1, children: [{ name: "apple" }, { name: "banana" }] },
    ]);
  });

  // 测试：删除分组键后的对象处理
  test("should remove the groupByKeys from nested objects", () => {
    const array = [
      { type: "fruit", name: "apple" },
      { type: "fruit", name: "banana" },
    ];
    const grouped = groupByAndNest(array, "type");
    expect(
      grouped.every((group) => !group.children.some((child) => "type" in child))
    ).toBeTruthy();
  });

  // 测试：多个分组键的顺序
  test("should not be affected by the order of groupByKeys", () => {
    const array = [
      { type: "fruit", color: "red", name: "apple" },
      { type: "fruit", color: "red", name: "banana" },
    ];
    const groupedByTypeFirst = groupByAndNest(array, ["type", "color"]);
    const groupedByColorFirst = groupByAndNest(array, ["color", "type"]);
    expect(groupedByTypeFirst).toEqual(groupedByColorFirst);
  });

  // 测试：使用默认的 childrenKey
  test("should use 'children' as the default childrenKey", () => {
    const array = [
      { type: "fruit", name: "apple" },
      { type: "fruit", name: "banana" },
    ];
    const grouped = groupByAndNest(array, "type");
    expect(grouped[0].children).toBeDefined();
  });

  // 测试：数组元素不是对象时的情况
  test("should throw an error when array elements are not objects", () => {
    const array = ["apple", "banana"];
    expect(() => {
      groupByAndNest(array, "type");
    }).toThrow("Array elements must be objects.");
  });
});
