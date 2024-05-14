/**
 * Recursively comparing two values to see if they are exactly the same (deep comparison) | 递归比较两个值是否完全相同（深度比较）
 *
 * @param {Any} a - The first value to compare | 要比较的第一个值
 * @param {Any} b - The second value to compare | 要比较的第二个值
 * @returns {boolean} - If two values are exactly the same, return true; Otherwise, return false | 如果两个值完全相同，则返回true；否则返回false
 */
export function deepCompare(a, b) {
  // Quickly compare basic types and function references
  // 快速比较基本类型和函数引用
  if (a === b) {
    // +0===-0, but we still consider them equal
    // +0 === -0，但我们仍然认为它们相等
    // NaN !== NaN, but we consider them equal here
    // NaN !== NaN，但这里我们特殊处理NaN
    return a !== 0 || 1 / a === 1 / b || (a !== a && b !== b); // NaN比较
  }

  // Check if any of them are null or undefined
  // 检查是否有一个是null或undefined
  if (a == null || b == null) {
    // If one is null and the other is not, or if both are but not equal, return false
    // 如果有一个是null而另一个不是，或者两个都是但不相等，返回false
    return a === b;
  }

  // Check if they are of different types
  // 检查类型是否相同
  const typeA = typeof a;
  const typeB = typeof b;
  if (typeA !== typeB) return false;

  // For date objects, directly compare timestamps
  // 对于日期对象，直接比较时间戳
  if (a instanceof Date && b instanceof Date)
    return a.getTime() === b.getTime();

  // For regular expressions, their source and flags properties can be compared
  // 对于正则表达式，可以比较它们的source和flags属性
  if (a instanceof RegExp && b instanceof RegExp) {
    return a.source === b.source && a.flags === b.flags;
  }

  // If they are objects or arrays, compare their properties recursively
  // 如果类型不是对象或数组，则它们应该不相等（已经排除了null、undefined、基本类型和函数）
  if (typeA !== "object" || typeB !== "object") return false;

  // If they are functions, compare their source code
  // 数组或对象的递归比较
  if (Array.isArray(a) && Array.isArray(b)) {
    // If the length is different, return false directly
    // 长度不同则直接返回false
    if (a.length !== b.length) return false;

    // Compare array elements one by one
    // 逐个比较数组元素
    for (let i = 0; i < a.length; i++) {
      if (!deepCompare(a[i], b[i])) return false;
    }
    return true;
  }

  // Recursive comparison of ordinary objects
  // 普通对象的递归比较
  const keysA = Object.keys(a);
  const keysB = Object.keys(b);

  // If the keys are different, return false directly
  // 确保两个对象有相同的键数
  if (keysA.length !== keysB.length) return false;

  // Check if the keys of the object are the same and recursively compare the values
  // 检查对象的键是否相同，并递归比较值
  for (let i = 0; i < keysA.length; i++) {
    const key = keysA[i];
    if (!b.hasOwnProperty(key) || !deepCompare(a[key], b[key])) {
      return false;
    }
  }

  // If all keys and values are the same, the objects are equal
  // 所有键和值都相等，所以对象相等
  return true;
}

/**
 * Check if a value is an object (not including arrays) | 检查值是否为对象（不包括数组）
 *
 * @param {Any} value - The value to check | 要检查的值
 * @returns {boolean} - If the value is an object, return true; Otherwise, return false | 如果值是对象，则返回true；否则返回false
 */
export function isObject(value) {
  if (value === null) {
    return false;
  }

  if (typeof value !== "object" || typeof value === "function") {
    return false;
  }

  if (Array.isArray(value) || value instanceof Array) {
    return false;
  }

  return true;
}

/**
 * Check if a value is an array | 检查值是否为数组
 *
 * @param {Any} value - The value to check | 要检查的值
 * @returns {boolean} - If the value is an array, return true; Otherwise, return false | 如果值是数组，则返回true；否则返回false
 */
export function isArray(value) {
  return Array.isArray(value);
}

/**
 * Check if a value is NaN | 检查值是否为NaN
 *
 * @param {Any} value - The value to check | 要检查的值
 * @returns {boolean} - If the value is NaN, return true; Otherwise, return false | 如果值是NaN，则返回true；否则返回false
 */
export function isNaN(value) {
  return Number.isNaN(value);
}

/**
 * Get the type of a value | 获取值的类型
 *
 * @param {Any} value - The value to get the type of | 要获取类型的值
 * @returns {string} - The type of the value | 值的类型
 */
export function type(value) {
  if (value === null) {
    return "Null";
  }
  if (value === undefined) {
    return "Undefined";
  }

  if (isNaN(value)) {
    return "NaN";
  }

  const typeLabel = Object.prototype.toString.call(value);

  const typeName = typeLabel.slice(8, -1);

  return typeName;
}

export default { deepCompare, isObject, isArray, isNaN, type };
