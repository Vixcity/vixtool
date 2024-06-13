/**
 * Convert hyphen separated naming to small hump naming | 将连字符分隔的命名转换为小驼峰命名
 * @param {string} hyphenatedName - The input string is usually a hyphen separated naming convention | 输入的字符串，通常是连字符分隔的命名
 * @returns {string} - Naming of converted small humps | 转换后的小驼峰命名
 */
export function hyphenatedToLowerCamelCase(hyphenatedName) {
  return (
    hyphenatedName
      // First, convert the string to lowercase
      // 首先，将字符串转换为小写
      .toLowerCase()
      // Remove the leading hyphen (if it exists)
      // 移除开头的连字符（如果存在）
      .replace(/^-+/, "")
      // Replace the hyphen with a space
      // 转换连字符后的首个字母为大写
      .replace(/-+(\d*[a-z])/g, (match, group1) => group1.toUpperCase())
      // Replace the remaining hyphen with a capital letter
      // 移除末尾的一个或多个连字符（如果存在）
      .replace(/-+$/, "")
  );
}

/**
 * Convert hyphen separated naming to camel hump naming | 将连字符分隔的命名转换为大驼峰命名
 * @param {string} hyphenatedName - The input string is usually a hyphen separated naming convention | 输入的字符串，通常是连字符分隔的命名
 * @returns {string} - Naming of the converted camel hump | 转换后的大驼峰命名
 */
export function hyphenatedToUpperCamelCase(hyphenatedName) {
  return (
    hyphenatedName
      // first, remove the trailing hyphen
      // 首先移除尾部连字符
      .replace(/-+$/, "")
      // convert the first letter to uppercase
      // 转换逻辑：移除连字符，并确保连字符后的首字母（如果是字母）转为大写
      .replace(/(^|-+)([a-z0-9])/g, (match, p1, p2) => p2.toUpperCase())
      // make sure the first letter is not lowercase after the conversion
      // 确保已大写的首字母不被低写后再大写，从而保持原样
      .replace(/(^|-+)([A-Z])/g, (match, p1, p2) => p2)
  );
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
 * Capitalize the first letter of each word in a string | 将字符串中的每个单词的首字母大写
 * @param {string} str - The input string | 输入的字符串
 * @returns {string} - The capitalized string | 首字母大写的字符串
 */
export function capitalizeWords(str) {
  return str
    .toLowerCase()
    .trim()
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
  capitalizeWords,
  countChars,
};
