#!/usr/bin/env node

/**
 * @description sort array by name | 按对象的名称排序对象数组
 * @param {*} arr
 * @param {*} props
 * @returns new array
 */
export function sortArrayByProperty(
  arr,
  { key, order = "asc" } = { key: "name", order: "asc" }
) {
  // 创建一个数组的深拷贝
  // create a deep copy of the array
  const copy = deepCopy(arr);

  // 确保 order 是有效的值
  // ensure order is a valid value
  const sortOrder = order.toLowerCase() === "desc" ? "desc" : "asc";

  // 使用数组的 sort 方法进行排序
  // 提供一个比较函数，根据 key 和 sortOrder 进行排序
  // recursively call uses the sort method of arrays for sorting
  // Provide a comparison function to sort based on key and sortOrder
  copy.sort((a, b) => {
    const valueA = a[key];
    const valueB = b[key];

    // 如果 a 和 b 的属性值相等，则返回 0
    // if a and b have the same property value, return 0
    if (valueA === valueB) {
      return 0;
    }

    // 根据 sortOrder 决定排序方向
    // determine the sorting direction based on sortOrder
    return sortOrder === "asc"
      ? valueA < valueB
        ? -1
        : 1
      : valueA > valueB
      ? -1
      : 1;
  });

  // 返回排序后的数组拷贝
  // return the sorted copy of the array
  return copy;
}

/**
 * @description shallow copy object | 浅拷贝对象
 * @param {*} obj
 * @returns new object
 */
export function shallowClone(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  return Array.isArray(obj) ? [...obj] : { ...obj };
}

/**
 * @description deep copy object | 深拷贝对象
 * @param {*} obj
 * @param {*} hash
 * @returns new object
 */
export function deepClone(obj, hash = new WeakMap()) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }

  // 如果对象是循环引用中的某个对象，则直接返回
  // if Object is already in the hash table, return it directly
  if (hash.has(obj)) {
    return hash.get(obj);
  }

  let copy;
  if (Array.isArray(obj)) {
    copy = [];
  } else {
    copy = {};
  }

  // 将当前对象和它的拷贝存入哈希表中
  // store the current object and its copy in the hash table
  hash.set(obj, copy);

  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      // 递归调用
      // recursively call
      copy[key] = deepCopy(obj[key], hash);
    }
  }

  return copy;
}

// Export defaults to creating a vixtool object, which contains all the methods
function createVixtool() {
  console.log("welcome to use vixtool");
  return {
    sortArrayByProperty,
    shallowClone,
    deepClone,
  };
}

const toolObj = createVixtool();

export const vixtool = toolObj;
export default toolObj;
