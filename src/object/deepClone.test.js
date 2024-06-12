import { deepClone } from ".";

describe("deepClone", () => {
  // 应该克隆基元值
  test("should clone primitive values", () => {
    const num = 1;
    const clonedNum = deepClone(num);
    expect(clonedNum).toBe(num);
  });

  // 应该深度克隆数组
  test("should deeply clone an array", () => {
    const arr = [1, [2, 3], { a: 4 }];
    const clonedArr = deepClone(arr);
    expect(clonedArr).toEqual(arr);
    expect(clonedArr).not.toBe(arr);
    expect(clonedArr[1]).not.toBe(arr[1]);
    expect(clonedArr[2]).not.toBe(arr[2]);
  });

  // 应该深度克隆对象
  test("should deeply clone an object", () => {
    const obj = { a: 1, b: { c: 2 }, d: [3, 4] };
    const clonedObj = deepClone(obj);
    expect(clonedObj).toEqual(obj);
    expect(clonedObj).not.toBe(obj);
    expect(clonedObj.b).not.toBe(obj.b);
    expect(clonedObj.d).not.toBe(obj.d);
  });

  // 应处理循环引用
  test("should handle circular references", () => {
    const circularObject = { a: 1 };
    circularObject.b = circularObject;
    const clonedCircularObject = deepClone(circularObject);
    expect(clonedCircularObject).toEqual(circularObject);
    expect(clonedCircularObject).not.toBe(circularObject);
    expect(clonedCircularObject.b).toBe(clonedCircularObject);
  });

  // 应该可以处理特殊对象，比如Date、Set、Map
  test("should clone special objects like Date, Set, Map", () => {
    const objWithSpecialTypes = {
      date: new Date(),
      set: new Set([1, 2, 3]),
      map: new Map([
        ["a", 1],
        ["b", 2],
      ]),
    };
    const clonedObjWithSpecialTypes = deepClone(objWithSpecialTypes);
    expect(clonedObjWithSpecialTypes).toEqual(objWithSpecialTypes);
    expect(clonedObjWithSpecialTypes.date).not.toBe(objWithSpecialTypes.date);
    expect(clonedObjWithSpecialTypes.set).not.toBe(objWithSpecialTypes.set);
    expect(clonedObjWithSpecialTypes.map).not.toBe(objWithSpecialTypes.map);
  });
});
