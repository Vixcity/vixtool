import { deepCompare } from ".";

describe("deepCompare", () => {
  test("compares basic types correctly", () => {
    expect(deepCompare(1, 1)).toBe(true);
    expect(deepCompare("string", "string")).toBe(true);
    expect(deepCompare(true, true)).toBe(true);
    expect(deepCompare(null, null)).toBe(true);
    expect(deepCompare(undefined, undefined)).toBe(true);
    expect(deepCompare(NaN, NaN)).toBe(true);
    expect(deepCompare(0, -0)).toBe(true);

    expect(deepCompare(1, "1")).toBe(false);
    expect(deepCompare("string", "another string")).toBe(false);
    expect(deepCompare(true, false)).toBe(false);
    expect(deepCompare(null, undefined)).toBe(false);
  });

  test("compares arrays correctly", () => {
    expect(deepCompare([1, 2, 3], [1, 2, 3])).toBe(true);
    expect(deepCompare([1, [2, 3]], [1, [2, 3]])).toBe(true);
    expect(deepCompare([1, 2, 3], [1, 2, 4])).toBe(false);
    expect(deepCompare([1, 2, 3], [1, 2, 3, 4])).toBe(false);
  });

  test("compares objects correctly", () => {
    expect(deepCompare({ a: 1, b: 2 }, { a: 1, b: 2 })).toBe(true);
    expect(deepCompare({ a: { b: 2 } }, { a: { b: 2 } })).toBe(true);
    expect(deepCompare({ a: 1 }, { b: 1 })).toBe(false);
    expect(deepCompare({ a: 1 }, { a: 2 })).toBe(false);
  });

  test("compares dates correctly", () => {
    const date1 = new Date(2020, 0, 1);
    const date2 = new Date(2020, 0, 1);
    const date3 = new Date(2021, 0, 1);
    expect(deepCompare(date1, date2)).toBe(true);
    expect(deepCompare(date1, date3)).toBe(false);
  });

  test("compares regular expressions correctly", () => {
    expect(deepCompare(/abc/, /abc/)).toBe(true);
    expect(deepCompare(/abc/i, /abc/i)).toBe(true);
    expect(deepCompare(/abc/, /abc/g)).toBe(false);
  });

  test("compares functions by reference", () => {
    const func1 = () => {
      return true;
    };
    const func2 = () => {
      return true;
    };
    const func3 = func1;

    expect(deepCompare(func1, func2)).toBe(false); // 即使函数体相同，但不是同一个引用
    expect(deepCompare(func1, func3)).toBe(true); // 完全相同的引用
  });

  test("considers different typed objects as not equal", () => {
    expect(deepCompare([], {})).toBe(false); // 数组与对象
    expect(deepCompare(new Date(), {})).toBe(false); // 日期与普通对象
    expect(deepCompare(/regex/, {})).toBe(false); // 正则表达式与对象
  });

  test("compares objects with circular references correctly", () => {
    const obj1 = { a: "value" };
    obj1.b = obj1;
    const obj2 = { a: "value" };
    obj2.b = obj2;

    expect(deepCompare(obj1, obj2)).toBe(true); // 两个对象拥有相同的循环引用结构

    const obj3 = { a: "value" };
    obj3.b = { c: obj3 };
    const obj4 = { a: "value" };
    obj4.b = obj4;

    expect(deepCompare(obj3, obj4)).toBe(false); // 不同的循环引用结构
  });

  test("compares null and undefined with objects", () => {
    expect(deepCompare(null, {})).toBe(false);
    expect(deepCompare(undefined, {})).toBe(false);
  });

  test("compares nested objects and arrays", () => {
    const obj1 = {
      a: [1, 2, { c: 3, d: [4, 5] }],
      b: { e: { f: { g: "test" } } },
    };
    const obj2 = {
      a: [1, 2, { c: 3, d: [4, 5] }],
      b: { e: { f: { g: "test" } } },
    };
    const obj3 = {
      a: [1, 2, { c: 3, d: [4, 5, 6] }], // 不同之处
      b: { e: { f: { g: "test" } } },
    };

    expect(deepCompare(obj1, obj2)).toBe(true);
    expect(deepCompare(obj1, obj3)).toBe(false);
  });

  test("compares arrays with extra properties", () => {
    const arr1 = [1, 2, 3];
    arr1.prop = "value";
    const arr2 = [1, 2, 3];
    arr2.prop = "value";
    const arr3 = [1, 2, 3];

    expect(deepCompare(arr1, arr2)).toBe(true); // 相同的额外属性
    expect(deepCompare(arr1, arr3)).toBe(false); // 缺少额外属性
  });
});
