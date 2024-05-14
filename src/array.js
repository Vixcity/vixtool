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
 * @description group an array of objects by a set of properties and nest the children | 根据一组属性对对象数组进行分组，并嵌套子对象
 * @param {Array} array - the array of objects to group and nest | 要分组和嵌套的对象数组
 * @param {Array|String} groupByKeys - the property(ies) to group by | 用于分组的属性（可以是数组）
 * @param {String} [childrenKey="children"] - the property to use for nesting the children | 用于嵌套子对象的属性名
 * @returns {Array} the grouped and nested array | 分组和嵌套后的数组
 */
export function groupByAndNest(array, groupByKeys, childrenKey = "children") {
  // ensure array is an array
  // 确保array是一个数组
  if (!Array.isArray(array)) {
    throw new Error('The "array" parameter is required and must be an array.');
  }

  // check groupByKeys is defined, not an empty array, and has a length greater than 0
  // 检查groupByKeys是否未定义、空数组或长度为0
  if (
    groupByKeys === undefined ||
    (Array.isArray(groupByKeys) && groupByKeys.length === 0)
  ) {
    console.warn(
      'You did not provide the "groupByKeys" parameter or it is an empty array. Returning the original array.'
    );
    return array;
  }

  // if groupByKeys is not an array, convert it to an array
  // 如果groupByKeys不是数组，则将其转换为数组
  groupByKeys = Array.isArray(groupByKeys) ? groupByKeys : [groupByKeys];

  // create a Map to store the groups
  // 创建一个Map来存储分组
  const grouped = new Map();

  // Traverse the array and group based on the value of groupByKeys
  // 遍历数组，根据groupByKeys的值分组
  array.forEach((item) => {
    // create a unique group key by joining all groupByKeys values (assuming they are all strings or can be converted to strings)
    // 创建一个唯一的分组键，通过连接所有groupByKeys的值（假设这些值都是字符串或可以转化为字符串）
    // use '|' or other non-appearing characters as separator
    // 使用'|'或其他不会出现在属性值中的字符作为分隔符
    const groupKey = groupByKeys.map((key) => item[key]).join("|");

    // if the group does not exist, create a new array as children
    // 如果Map中没有这个分组，则创建一个新的数组作为children
    if (!grouped.has(groupKey)) {
      grouped.set(groupKey, {
        // Extract the value of the grouping key to the outer object
        // 提取分组键的值到外层对象
        ...groupByKeys.reduce((obj, key) => ({ ...obj, [key]: item[key] }), {}),
        [childrenKey]: [],
      });
    }

    // add the item to the corresponding group's children array
    // 从原对象中移除groupByKeys对应的属性（如果需要）
    const { ...rest } = item;
    const toRemove = new Set(groupByKeys);
    for (const key of toRemove) {
      delete rest[key];
    }

    // add the remaining properties to the corresponding group's children array
    // 将剩余的属性添加到对应分组的children数组中
    grouped.get(groupKey)[childrenKey].push(rest);
  });

  // Convert the Map to an array and return it
  // 将Map转换回数组
  return Array.from(grouped.values());
}

/**
 * Return an array after deduplication. Supports deduplication of regular arrays, object arrays, and array arrays | 返回一个去重后的数组。支持普通数组、对象数组和数组数组的去重
 *
 * @param {Array} arr - Arrays that need to be deduplicated | 需要去重的数组
 * @param {string} [keyForObjects] - For object arrays, the attribute key names used to determine uniqueness. If not specified, use the entire structure of the object for comparison | 对于对象数组，用于确定唯一性的属性键名。如果未指定，则使用对象的整个结构进行比较
 * @returns {Array} - The deduplicated array | 去重后的数组
 * @throws {Error} - If the input is not an array, throw an error | 如果输入的不是数组，则抛出错误
 */
export function uniqueArray(arr, keyForObjects = null) {
  const uniqueSet = new Map();

  return arr.filter((item) => {
    // If it is an object array and a key is specified, use the value of the key as the unique identifier
    // 如果是对象数组并且指定了key，则使用key的值作为唯一标识
    if (keyForObjects && typeof item === "object" && item !== null) {
      const key = item[keyForObjects];
      if (!uniqueSet.has(key)) {
        uniqueSet.set(key, item);
        return true;
      }
      return false;
    }
    // if it is an array array, use recursion to compare
    // 如果是数组数组，则使用递归比较
    else if (Array.isArray(item)) {
      const stringified = JSON.stringify(item);
      if (!uniqueSet.has(stringified)) {
        uniqueSet.set(stringified, item);
        return true;
      }
      return false;
    }
    // For regular arrays and objects without a specified key, use values as unique identifiers directly
    // 对于普通数组和未指定key的对象，直接使用值作为唯一标识
    else {
      if (!uniqueSet.has(item)) {
        uniqueSet.set(item, item);
        return true;
      }
      return false;
    }
  });
}

export default {
  sortArrayByProperty,
  groupByAndNest,
  uniqueArray,
};
