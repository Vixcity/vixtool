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

/**
 * Parse the URL and return an object containing the various parts of the URL. | 解析URL并返回一个包含URL各部分的对象
 * If the URL does not specify a non default port, the port attribute will not be returned | 如果URL没有指定非默认端口，则不会返回port属性
 *
 * @param {string} url - The URL string to be parsed, defaults to the URL of the current page | 要解析的URL字符串，默认为当前页面的URL
 * @returns {object} - An object containing the various parts of the URL | 包含URL各部分的对象，如protocol, host, port, path, queryParams
 */
export function parseUrl(url) {
  // Create a URL object
  // 创建一个URL对象
  const parsedUrl = new URL(url || window.location.href);

  // Parsing query parameters
  // 解析查询参数
  function parseQueryParams(queryString) {
    const params = {};
    const pairs = queryString.split("&");

    for (const pair of pairs) {
      const [key, value] = pair.split("=");

      if (!key) return {};

      // Attempt to parse JSON (if the value looks like a JSON string)
      // 尝试解析JSON（如果值看起来像JSON字符串）
      try {
        const parsedValue = JSON.parse(decodeURIComponent(value));
        params[decodeURIComponent(key)] = parsedValue || "";
      } catch (e) {
        // If the value is not JSON, assign it true (optional, depending on your needs)
        // 如果不是JSON，则直接赋值
        params[decodeURIComponent(key)] = value
          ? decodeURIComponent(value)
          : "";
      }
    }

    return params;
  }

  // Return an object containing all the necessary information
  // 返回包含所有所需信息的对象
  const result = {
    protocol: parsedUrl.protocol.slice(0, -1), // Remove the colon at the end | 移除末尾的冒号
    host: parsedUrl.host,
    path: parsedUrl.pathname,
    queryParams: parseQueryParams(parsedUrl.search),
  };

  // If the port is not the default port (HTTP: 80, HTTPS: 443), add the port attribute
  // 如果端口不是默认端口（HTTP:80, HTTPS:443），则添加port属性
  if (parsedUrl.port !== (parsedUrl.protocol === "https:" ? "443" : "80")) {
    result.port = parsedUrl.port;
  }

  return result;
}

/**
 * Parse the query parameters in the URL and return an object | 解析URL中的查询参数并返回一个对象
 *
 * @param {string} [url=''] - The URL to be parsed, defaults to the URL of the current page | 要解析的URL，默认为当前页面的URL
 * @returns {Object} - An object containing the query parameters | 包含查询参数的对象。
 */
export function parseQueryParams(url) {
  const parsedUrl = parseUrl(url);
  const queryParams = parsedUrl.queryParams;

  return queryParams;
}

// Export defaults to creating a vixtool object, which contains all the methods
function createVixtool() {
  console.log("welcome to use vixtool");
  return {
    sortArrayByProperty,
    shallowClone,
    deepClone,
    parseUrl,
    parseQueryParams,
  };
}

const toolObj = createVixtool();

export const vixtool = toolObj;
export default toolObj;
