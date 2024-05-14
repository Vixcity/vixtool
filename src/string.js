/**
 * Convert hyphen separated naming to small hump naming | 将连字符分隔的命名转换为小驼峰命名
 * @param {string} hyphenatedName - The input string is usually a hyphen separated naming convention | 输入的字符串，通常是连字符分隔的命名
 * @returns {string} - Naming of converted small humps | 转换后的小驼峰命名
 */
export function hyphenatedToLowerCamelCase(hyphenatedName) {
  return hyphenatedName
    .replace(/-([a-z])/g, function (match, group1) {
      return group1.toUpperCase();
    })
    .replace(/^-/, "");
}

/**
 * Convert hyphen separated naming to camel hump naming | 将连字符分隔的命名转换为大驼峰命名
 * @param {string} hyphenatedName - The input string is usually a hyphen separated naming convention | 输入的字符串，通常是连字符分隔的命名
 * @returns {string} - Naming of the converted camel hump | 转换后的大驼峰命名
 */
export function hyphenatedToUpperCamelCase(hyphenatedName) {
  return hyphenatedName.replace(/-([a-z])/g, function (match, group1) {
    return group1.toUpperCase();
  });
}

/**
 * Convert camel hump naming to hyphen separated naming | 将驼峰命名转换为连字符分隔的命名
 * @param {string} camelCaseName - The input string is usually a camel hump naming convention | 输入的字符串，通常是驼峰命名
 * @returns {string} - Naming of the converted hyphen separated naming | 转换后的连字符分隔命名
 */
export function camelCaseToHyphenated(camelCaseName) {
  return (
    camelCaseName
      // First, convert the initial uppercase letters to lowercase
      // 首先将开头的大写字母转换为小写
      .replace(/^([A-Z])/, (match, group1) => group1.toLowerCase())
      // Then convert the remaining uppercase letters to horizontal bars and lowercase letters
      // 然后将剩余的大写字母转换为横杠+小写字母
      .replace(/([A-Z])/g, "-$1")
      .toLowerCase()
  );
}

/**
 * Generate a random string with the specified length | 生成指定长度的随机字符串
 * @param {number} length - The length of the random string | 随机字符串的长度
 * @returns {string} - The generated random string | 生成的随机字符串
 */
export function generateRandomString(length = 10) {
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
 * Capitalize the first letter of each word in a string | 将字符串中的每个单词的首字母大写
 * @param {string} str - The input string | 输入的字符串
 * @returns {string} - The capitalized string | 首字母大写的字符串
 */
export function capitalizeWords(str) {
  return str
    .toLowerCase()
    .split(" ")
    .map(function (word) {
      return word.charAt(0).toUpperCase() + word.slice(1);
    })
    .join(" ");
}

/**
 * Count the occurrence of each character in a string | 统计字符串中每个字符的出现次数
 * @param {string} str - The input string | 输入的字符串
 * @returns {object} - The object containing the count of each character | 包含每个字符出现次数的对象
 */
export function countChars(str) {
  const charCount = {};
  for (let char of str) {
    charCount[char] = (charCount[char] || 0) + 1;
  }
  return charCount;
}

export default {
  hyphenatedToLowerCamelCase,
  hyphenatedToUpperCamelCase,
  camelCaseToHyphenated,
  generateRandomString,
  capitalizeWords,
  countChars,
};
