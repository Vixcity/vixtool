// 引入要测试的函数
import { sortArrayByProperty } from ".";

describe("sortArrayByProperty", () => {
  // 测试默认升序排序
  it("sorts the array in ascending order by default", () => {
    const input = [{ name: "Banana" }, { name: "Apple" }, { name: "Orange" }];
    expect(sortArrayByProperty(input)).toEqual([
      { name: "Apple" },
      { name: "Banana" },
      { name: "Orange" },
    ]);
  });

  // 测试指定升序排序
  it("sorts the array in ascending order", () => {
    const input = [{ name: "Banana" }, { name: "Apple" }, { name: "Orange" }];
    expect(sortArrayByProperty(input, { key: "name", order: "asc" })).toEqual([
      { name: "Apple" },
      { name: "Banana" },
      { name: "Orange" },
    ]);
  });

  // 测试指定降序排序
  it("sorts the array in descending order", () => {
    const input = [{ name: "Banana" }, { name: "Apple" }, { name: "Orange" }];
    expect(sortArrayByProperty(input, { key: "name", order: "desc" })).toEqual([
      { name: "Orange" },
      { name: "Banana" },
      { name: "Apple" },
    ]);
  });

  // 测试非字符串属性排序
  it("sorts the array by a non-string property", () => {
    const input = [{ age: 30 }, { age: 20 }, { age: 25 }];
    expect(sortArrayByProperty(input, { key: "age" })).toEqual([
      { age: 20 },
      { age: 25 },
      { age: 30 },
    ]);
  });

  // 测试空数组
  it("sorts an empty array", () => {
    const input = [];
    expect(sortArrayByProperty(input)).toEqual([]);
  });

  // 测试非对象数组
  it("throws an error when the array contains non-object elements", () => {
    const input = [1, 2, 3];
    expect(() => sortArrayByProperty(input)).toThrow(
      'The key "name" is not valid for the objects in the array.'
    );
  });

  // 测试不存在的属性键
  it("throws an error when the key does not exist on objects", () => {
    const input = [{ name: "Banana" }, { fruit: "Apple" }, { name: "Orange" }];
    expect(() => sortArrayByProperty(input, { key: "nonExistent" })).toThrow(
      'The key "nonExistent" is not valid for the objects in the array.'
    );
  });

  // 测试单个元素数组
  it("sorts an array with a single element", () => {
    const input = [{ name: "Apple" }];
    expect(sortArrayByProperty(input)).toEqual([{ name: "Apple" }]);
  });

  // 测试所有元素属性值相同
  it("sorts an array with all identical property values", () => {
    const input = [{ name: "Apple" }, { name: "Apple" }, { name: "Apple" }];
    expect(sortArrayByProperty(input)).toEqual(input); // 期望数组保持不变
  });

  // 测试包含特殊字符的键
  it("sorts an array with keys containing special characters", () => {
    const input = [
      { "name!@#": "Banana" },
      { "name!@#": "Apple" },
      { "name!@#": "Orange" },
    ];
    expect(sortArrayByProperty(input, { key: "name!@#" })).toEqual([
      { "name!@#": "Apple" },
      { "name!@#": "Banana" },
      { "name!@#": "Orange" },
    ]);
  });

  // 测试类型检查
  it("throws an error when the first argument is not an array", () => {
    const input = {};
    expect(() => sortArrayByProperty(input)).toThrow(
      "The first argument must be an array."
    );
  });
});
