import { shallowClone } from ".";

describe("shallowClone", () => {
  // 测试基本数据类型（如数字）是否被正确返回
  test("should return the same primitive value", () => {
    const num = 1;
    const clonedNum = shallowClone(num);
    // 预期克隆的数字与原始数字相同
    expect(clonedNum).toBe(num);
  });

  // 测试对象是否被浅拷贝，即新对象与原对象内容相同但引用不同
  test("should shallow clone an object", () => {
    const obj = { a: 1, b: 2 };
    const clonedObj = shallowClone(obj);
    // 预期克隆的对象与原对象内容相同
    expect(clonedObj).toEqual(obj);
    // 预期克隆的对象与原对象引用不同
    expect(clonedObj).not.toBe(obj);
    // 由于是浅拷贝，对象内部的属性引用应与原对象相同
    expect(clonedObj.a).toBe(obj.a);
  });

  // 测试数组是否被浅拷贝，即新数组与原数组内容相同但引用不同
  test("should shallow clone an array", () => {
    const arr = [1, 2, 3];
    const clonedArr = shallowClone(arr);
    // 预期克隆的数组与原数组内容相同
    expect(clonedArr).toEqual(arr);
    // 预期克隆的数组与原数组引用不同
    expect(clonedArr).not.toBe(arr);
    // 由于是浅拷贝，数组内部的元素引用应与原数组相同
    expect(clonedArr[0]).toBe(arr[0]);
  });

  // 测试嵌套对象和数组是否被正确浅拷贝
  test("should handle nested objects and arrays", () => {
    const nested = { a: 1, b: [2, 3], c: { d: 4 } };
    const clonedNested = shallowClone(nested);
    // 预期克隆的嵌套结构与原结构内容相同
    expect(clonedNested).toEqual(nested);
    // 预期克隆的嵌套结构与原结构引用不同
    expect(clonedNested).not.toBe(nested);
    // 由于是浅拷贝，嵌套结构内部的引用应与原结构相同
    expect(clonedNested.b).toBe(nested.b);
    expect(clonedNested.c).toBe(nested.c);
  });

  // 测试null和undefined是否被正确处理
  test("should handle null and undefined", () => {
    const nullValue = null;
    const undefinedValue = undefined;
    // 预期null和undefined被直接返回
    expect(shallowClone(nullValue)).toBe(nullValue);
    expect(shallowClone(undefinedValue)).toBe(undefinedValue);
  });

  // 测试空对象和数组是否被正确浅拷贝
  test("should handle empty objects and arrays", () => {
    const emptyObj = {};
    const emptyArr = [];
    // 预期空对象和数组被浅拷贝，内容相同但引用不同
    expect(shallowClone(emptyObj)).toEqual(emptyObj);
    expect(shallowClone(emptyArr)).toEqual(emptyArr);
    expect(shallowClone(emptyObj)).not.toBe(emptyObj);
    expect(shallowClone(emptyArr)).not.toBe(emptyArr);
  });

  // 测试包含函数和日期的复杂对象是否被正确浅拷贝
  test("should handle complex objects with functions and dates", () => {
    const complexObj = {
      func: () => "Hello",
      date: new Date(),
      nested: { a: 1 },
    };
    const clonedComplexObj = shallowClone(complexObj);
    // 预期复杂对象被浅拷贝，内容相同但引用不同
    expect(clonedComplexObj).toEqual(complexObj);
    expect(clonedComplexObj).not.toBe(complexObj);
    // 由于是浅拷贝，对象内部的引用应与原对象相同
    expect(clonedComplexObj.func).toBe(complexObj.func);
    expect(clonedComplexObj.date).toBe(complexObj.date);
    expect(clonedComplexObj.nested).toBe(complexObj.nested);
  });
});
