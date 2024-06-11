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

  // 检查特殊对象类型并进行克隆
  // check special object types and clone them
  const Constructor = obj.constructor;
  switch (Constructor) {
    case RegExp:
      return new Constructor(obj);
    case Date:
      return new Constructor(obj.getTime());
    case Set:
      return new Set([...obj].map((item) => deepClone(item, hash)));
    case Map:
      return new Map([...obj].map(([k, v]) => [k, deepClone(v, hash)]));
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
      copy[key] = deepClone(obj[key], hash);
    }
  }

  return copy;
}

export default {
  shallowClone,
  deepClone,
};
