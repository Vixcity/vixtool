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

/**
 * Check if a value exists in a collection (array, object or string) | 检查给定值是否存在于集合中
 *
 * @param {any} value - The value to check | 要检查的值。
 * @param {Array|Object|string} collection - The collection to check in | 要检查的集合，可以是数组、对象或字符串。
 * @param {'key'|'value'} [keyOrValue='value'] - If the collection is an object, specify whether to check the key or value. Default is 'value' | 如果集合是对象，指定是检查键还是值。默认为'value'。
 * @returns {boolean} - If the value exists in the collection, return true; Otherwise, return false | 如果值存在于集合中，返回true；否则返回false。
 */
export function checkValueInCollection(
  value,
  collection,
  keyOrValue = "value"
) {
  if (Array.isArray(collection)) {
    // checks if value exists in array
    // 检查值是否在数组中
    return collection.includes(value);
  } else if (typeof collection === "object" && collection !== null) {
    // checks if value exists in object
    // 检查值是否在对象中
    if (keyOrValue === "key") {
      // checks if key exists in object
      // 检查属性名是否在对象中
      return Object.keys(collection).includes(value);
    } else if (keyOrValue === "value") {
      // checks if value exists in object
      // 检查属性值是否在对象中
      return Object.values(collection).includes(value);
    }
  } else if (typeof collection === "string") {
    // checks if value exists in string
    // 检查字符是否在字符串中
    return collection.includes(value);
  }
  // if collection is not an array, object or string, return false
  // 如果集合不是预期的类型，返回false
  return false;
}

/**
   * Check if a value is empty or null | 检查值是否为空或null。
   * @param {*} value - The value to check | 要检查的值。
   * @returns {boolean} - If the value is empty or null, return true; Otherwise, return false | 如果值为空或null，返回true，否则返回false。
   */
export function isEmpty(value) {
  return value == null || value === undefined || value === "";
};

/**
 * A utility function for logging and printing formatted messages and data in the console | 一个用于在控制台中记录和打印格式化消息及数据的实用函数。
 * @returns {Object} - An object containing various logging methods | 包含各种日志方法的对象。
 */
export function prettyLog() {
  /**
   * Print a formatted message in the console | 在控制台中打印格式化消息。
   * @param {string} title - The title of the message | 消息的标题。
   * @param {string} text - The content of the message | 消息的内容。
   * @param {string} color - The color of the message | 消息的颜色。
   */
  const prettyPrint = (title, text, color) => {
    console.log(
      `%c ${title} %c ${text} %c`,
      `background:${color};border:1px solid ${color}; padding: 1px; border-radius: 2px 0 0 2px; color: #fff;`,
      `border:1px solid ${color}; padding: 1px; border-radius: 0 2px 2px 0; color: ${color};`,
      "background:transparent"
    );
  };

  /**
   * record information message | 记录信息消息。
   * @param {string} textOrTitle - The content or title of the message | 消息的内容或标题。
   * @param {string} [content=''] - message content | 消息的可选内容。
   */
  const info = (textOrTitle, content = "") => {
    const title = isEmpty(content) ? "信息" : textOrTitle;
    const text = isEmpty(content) ? textOrTitle : content;
    prettyPrint(title, text, "#909399");
  };

  /**
   * record error message | 记录错误消息。
   * @param {string} textOrTitle - message content or title | 消息的内容或标题。
   * @param {string} [content=''] - message content | 消息的可选内容。
   */
  const error = (textOrTitle, content = "") => {
    const title = isEmpty(content) ? "错误" : textOrTitle;
    const text = isEmpty(content) ? textOrTitle : content;
    prettyPrint(title, text, "#F56C6C");
  };

  /**
   * record warning message | 记录警告消息。
   * @param {string} textOrTitle - message content or title | 消息的内容或标题。
   * @param {string} [content=''] - message content | 消息的可选内容。
   */
  const warning = (textOrTitle, content = "") => {
    const title = isEmpty(content) ? "警告" : textOrTitle;
    const text = isEmpty(content) ? textOrTitle : content;
    prettyPrint(title, text, "#E6A23C");
  };

  /**
   * record success message | 记录成功消息。
   * @param {string} textOrTitle - message content or title | 消息的内容或标题。
   * @param {string} [content=''] - message content | 消息的可选内容。
   */
  const success = (textOrTitle, content = "") => {
    const title = isEmpty(content) ? "成功" : textOrTitle;
    const text = isEmpty(content) ? textOrTitle : content;
    prettyPrint(title, text, "#67C23A");
  };

  /**
   * Print a table in the console | 在控制台中打印表格。
   * @param {Array<Array<any>>} data - The data to print in the table | 要在表格中打印的数据。
   */
  const table = (data) => {
    console.table(data)
  };

  /**
   * Print an image in the console | 在控制台中打印图像。
   * @param {string} url - The URL of the image | 图像的URL。
   * @param {number} [scale=1] - The scale of the image | 图像的缩放比例。
   */
  const picture = (url, scale = 1) => {
    const img = new Image();
    img.crossOrigin = "anonymous";
    img.onload = () => {
      const c = document.createElement("canvas");
      const ctx = c.getContext("2d");
      if (ctx) {
        c.width = img.width;
        c.height = img.height;
        ctx.fillStyle = "red";
        ctx.fillRect(0, 0, c.width, c.height);
        ctx.drawImage(img, 0, 0);
        const dataUri = c.toDataURL("image/png");

        console.log(
          `%c sup?`,
          `font-size: 1px;
                  padding: ${Math.floor(
                    (img.height * scale) / 2
                  )}px ${Math.floor((img.width * scale) / 2)}px;
                  background-image: url(${dataUri});
                  background-repeat: no-repeat;
                  background-size: ${img.width * scale}px ${
            img.height * scale
          }px;
                  color: transparent;
                  `
        );
      }
    };
    img.src = url;
  };

  return {
    info,
    error,
    warning,
    success,
    picture,
    table,
  };
}

export default {
  deepCompare,
  isObject,
  isArray,
  isNaN,
  type,
  checkValueInCollection,
  prettyLog,
  isEmpty,
};
