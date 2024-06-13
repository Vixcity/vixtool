import { prettyLog } from "../utils";
const log = prettyLog();

/**
 * Generate a random string with the specified length | 生成指定长度的随机字符串
 * @param {number} length - The length of the random string | 随机字符串的长度
 * @returns {string} - The generated random string | 生成的随机字符串
 */
export function getRandomString(length = 10) {
  if (typeof length !== "number" || isNaN(length)) {
    throw new Error("args must be a number");
  }

  const characters =
    "ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789!@#$%^&*()-_=+[{]};:'\\\"|,<.>/?`~";
  let randomString = "";

  for (let i = 0; i < length; i++) {
    const randomIndex = Math.floor(Math.random() * characters.length);
    randomString += characters.charAt(randomIndex);
  }

  return randomString;
}

/**
 * Get a random number within a specified range | 获取指定范围内的随机数
 * @param {Number} minNum - The minimum value of a random number | 随机数的最小值
 * @param {Number} maxNum - The maximum value of a random number | 随机数的最大值
 * @returns {Number} random number | 随机数
 */
export function getRandomNum(minNum = 0, maxNum = 100) {
  // Convert parameters to numerical values
  // 将参数转换为数值
  minNum = Number(minNum);
  maxNum = Number(maxNum);

  // Check if the parameters are valid numbers or numeric strings
  // 检查转换后的参数是否为有效数字
  if (isNaN(minNum) || isNaN(maxNum)) {
    throw new Error("Both arguments must be numbers or numeric strings");
  }

  // If the minimum value is greater than the maximum value, issue a warning and swap
  // 如果最小值大于最大值，发出警告并交换
  if (minNum > maxNum) {
    log.warning(
      "The minimum value is greater than the maximum value. The values will be swapped."
    );
    let temp = minNum;
    minNum = maxNum;
    maxNum = temp;
  }

  // Generate and return random numbers
  // 生成并返回随机数
  return Math.floor(Math.random() * (maxNum - minNum + 1)) + minNum;
}

/**
 * Get a random float within a specified range with a specified precision | 获取指定范围内的随机浮点数
 *
 * @param {number} min - The minimum value of a random number | 随机数的最小值。
 * @param {number} max - The maximum value of a random number | 随机数的最大值。
 * @param {number} precision - The precision of the random float | 随机浮点数的精度。
 * @returns {number} - The generated random float | 生成的随机浮点数。
 */
export function getRandomFloat(min, max, precision) {
  // Ensure that min is less than max
  // 确保 min 小于 max
  if (min > max) {
    [min, max] = [max, min];
  }

  // Ensure that precision is a positive integer
  // 确保 precision 是正整数
  if (
    typeof precision !== "number" ||
    precision < 0 ||
    !Number.isInteger(precision)
  ) {
    throw new Error("Precision must be a positive integer.");
  }

  // Generate a random float within the specified range
  // 生成一个介于 min 和 max 之间的随机浮点数
  const randomValue = Math.random() * (max - min) + min;

  // Round the random value to the specified precision
  // 将随机数转换为指定精度的字符串
  const formattedValue = randomValue.toFixed(precision);

  // Convert the formatted value to a number
  // 返回转换后的数值
  return parseFloat(formattedValue);
}

/**
 * Get a random element from an array | 随机从数组中选择一个元素并返回。
 * If the array is empty, return undefined. | 如果数组为空，则返回undefined。
 *
 * @param {Array} array - The array to select an element from | 用于选择元素的数组。
 * @return {any} - A random element from the array, or undefined if the array is empty | 数组中的一个随机元素，如果数组为空，则为undefined。
 */
export function getRandomElement(array) {
  // check if the input is an array and not empty
  // 检查输入是否为数组以及数组是否为空
  if (!Array.isArray(array) || array.length === 0) {
    return undefined;
  }

  // Generate a random index within the array range
  // 生成一个介于0（包含）和数组长度（不包含）之间的随机索引
  const randomIndex = Math.floor(Math.random() * array.length);

  // Return the element at the random index
  // 返回随机索引对应的数组元素
  return array[randomIndex];
}

/**
 * Generate and return a random boolean value. | 随机生成并返回一个布尔值。
 *
 * @return {boolean} - randomly generated boolean value (true or false) | 随机的布尔值（true 或 false）。
 */
export function getRandomBool() {
  // Math.random() 生成一个介于 0（包含）和 1（不包含）之间的随机数。
  // 如果这个值小于 0.5，我们返回 false，否则返回 true。
  return Math.random() < 0.5;
}

/**
 * generate a random hexadecimal color value. | 生成一个随机的十六进制颜色值。
 *
 * @return {string} - a random hexadecimal color value, in the format of #XXXXXX | 随机颜色的十六进制表示，形如 #XXXXXX。
 */
export function getRandomColor() {
  // Randomly generate an integer between 0x0 and 0xFFFFFF
  // 随机生成一个介于0x0到0xFFFFFF之间的整数。
  const color = Math.floor(Math.random() * 0xffffff);
  // Convert the integer to hexadecimal, fill in 6 digits, and add # before it.
  // 将该整数转换为十六进制，补足6位，并在前面加上#。
  return `#${color.toString(16).padStart(6, "0")}`;
}

/**
 * Generate a random UUID according to the UUID v4 specification. | 生成一个符合UUID v4规范的随机UUID。
 *
 * @return {string} 随机生成的UUID。
 */
export function getRandomUUID() {
  return "xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g, function (c) {
    // Get a random integer between 0 and 15
    // 获取0到15之间的随机整数
    const r = (Math.random() * 16) | 0;
    // If it is' y ', ensure that the result is 8, 9, A, or B
    // 如果是'y'，确保结果是8, 9, A, 或 B
    const v = c === "x" ? r : (r & 0x3) | 0x8;
    return v.toString(16);
  });
}

/**
 * use Fisher-Yates algorithm to shuffle the elements of an array randomly. | 使用Fisher-Yates算法随机打乱数组的元素。
 *
 * @param {Array} array - The array to be shuffled | 要打乱的数组
 * @return {Array} - The shuffled array | 打乱后的新数组
 */
export function shuffleArray(array) {
  // Check if the input is an array
  // 检查输入是否为数组
  if (!Array.isArray(array)) {
    throw new Error("Input must be an array");
  }

  // Make a shallow copy of the input array to avoid modifying the original array
  // 对输入数组进行浅拷贝，以避免修改原数组
  let shuffledArray = array.slice();

  // Iterate over the array from the last element to the first element
  // 从数组的最后一个元素开始，向前遍历数组
  for (let i = shuffledArray.length - 1; i > 0; i--) {
    // Generate a random index between 0 and i (inclusive)
    // 随机选择一个从当前位置到数组开头的一个元素的索引
    const j = Math.floor(Math.random() * (i + 1));

    // Swap the current element with the randomly selected element
    // 交换当前元素与随机选中的元素
    [shuffledArray[i], shuffledArray[j]] = [shuffledArray[j], shuffledArray[i]];
  }

  return shuffledArray;
}

/**
 * Generate a random date object within a specified date range. | 生成一个在指定日期范围内的随机日期对象。
 *
 * @param {Date} start - The start date of the range | 范围的开始日期
 * @param {Date} end - The end date of the range | 范围的结束日期
 * @return {Date} - The generated random date | 生成的随机日期
 */
export function getRandomDate(start, end) {
  // Check if the input is valid
  // 验证 `start` 和 `end` 是否为日期对象，并且 `start` 是否在 `end` 之前
  if (!(start instanceof Date) || !(end instanceof Date) || start >= end) {
    throw new Error("Invalid date range");
  }

  // Generate a random timestamp within the specified range
  // 获取开始日期和结束日期的时间戳
  const startDate = start.getTime();
  const endDate = end.getTime();

  // Generate a random timestamp within the specified range
  // 生成一个介于开始日期和结束日期之间的随机时间戳
  const randomTimeStamp = startDate + Math.random() * (endDate - startDate);

  // Convert the random timestamp to a date object
  // 生成新的日期对象并返回
  return new Date(randomTimeStamp);
}

/**
 * Generate a random timestamp within a specified timestamp range. | 生成一个在指定时间戳范围内的随机时间戳。
 *
 * @param {number} start - The start timestamp of the range | 范围的开始时间戳
 * @param {number} end -  The end timestamp of the range | 范围的结束时间戳
 * @return {number} - The generated random timestamp | 生成的随机时间戳
 */
export function getRandomTimestamp(start, end) {
  // Check if the input is valid
  // 验证 `start` 和 `end` 是否为有效数字，并且 `start` 是否不大于 `end`
  if (typeof start !== "number" || typeof end !== "number") {
    throw new Error("Invalid timestamp range");
  }

  if (start >= end) {
    [start, end] = [end, start];
  }

  // compute a random timestamp within the specified range
  // 计算随机时间戳
  return start + Math.random() * (end - start);
}

/**
 * Generate a random value from a given enumeration object. | 从给定的枚举对象中随机选择并返回一个枚举值。
 *
 * @param {Object} enumType - The object that represents the enumeration | 用于表示枚举的对象。
 * @return {string|number} - A random value from the given enumeration object | 枚举对象中的一个随机值。
 */
export function getRandomEnum(enumType) {
  // Check if the input is a valid enumeration object
  // 首先获取枚举对象的所有值
  const values = Object.values(enumType);

  // Check if the input is a valid enumeration object
  // 如果枚举对象为空，抛出错误
  if (values.length === 0) {
    throw new Error("The enumeration cannot be empty.");
  }

  // Generate a random index within the values range
  // 生成一个随机索引，并返回对应的枚举值
  const randomIndex = Math.floor(Math.random() * values.length);
  return values[randomIndex];
}

/**
 * Generate a random binary string with the specified length. | 生成一个指定长度的随机二进制字符串。
 *
 * @param {number} length - The length of the random binary string to be generated | 生成的二进制字符串的长度。
 * @return {string} - The generated 随机生成的二进制字符串。
 */
export function getRandomBinary(length) {
  if (typeof length !== "number" || length <= 0) {
    throw new Error("Length must be a positive number.");
  }

  let binaryString = "";
  for (let i = 0; i < length; i++) {
    // Generate a random bit (0 or 1)
    // 生成一个随机的 0 或 1
    const randomBit = Math.round(Math.random());
    binaryString += randomBit;
  }

  return binaryString;
}

/**
 * Generate a random hexadecimal string with the specified length. | 生成一个指定长度的随机十六进制字符串。
 *
 * @param {number} length - The length of the random hexadecimal string to be generated | 生成的十六进制字符串的长度。
 * @return {string} - The generated random hexadecimal string | 随机生成的十六进制字符串。
 */
export function getRandomHex(length) {
  if (typeof length !== "number" || length <= 0) {
    throw new Error("Length must be a positive number.");
  }

  let hexString = "";
  for (let i = 0; i < length; i++) {
    // Generate a random integer between 0 and 15
    // 生成一个从 0 到 15 的随机数，并将其转换为十六进制
    const randomHexValue = Math.floor(Math.random() * 16).toString(16);
    hexString += randomHexValue;
  }

  return hexString;
}

export default {
  getRandomString,
  getRandomNum,
  getRandomFloat,
  getRandomElement,
  getRandomBool,
  getRandomColor,
  getRandomUUID,
  shuffleArray,
  getRandomDate,
  getRandomTimestamp,
  getRandomEnum,
  getRandomBinary,
  getRandomHex,
};
