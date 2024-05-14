/**
 * Convert numbers to English representation | 将数字转换为英文表示
 * @param {Number} num - Number to be converted | 要转换的数字
 * @returns {String} The English representation of numbers | 数字的英文表示
 */
export function convertNumberToWords(num) {
  if (num < 0 || num > 999999999999999) {
    return "Number out of range";
  }

  const units = ["", "thousand", "million", "billion", "trillion"];
  const ones = [
    "",
    "one",
    "two",
    "three",
    "four",
    "five",
    "six",
    "seven",
    "eight",
    "nine",
  ];
  const teens = [
    "ten",
    "eleven",
    "twelve",
    "thirteen",
    "fourteen",
    "fifteen",
    "sixteen",
    "seventeen",
    "eighteen",
    "nineteen",
  ];
  const tens = [
    "",
    "",
    "twenty",
    "thirty",
    "forty",
    "fifty",
    "sixty",
    "seventy",
    "eighty",
    "ninety",
  ];

  function convertHundreds(n) {
    let word = "";
    if (n >= 100) {
      word += ones[Math.floor(n / 100)] + " hundred";
      n %= 100;
      if (n > 0) word += " ";
    }
    if (n >= 20) {
      word += tens[Math.floor(n / 10)];
      n %= 10;
      if (n > 0) word += "-";
    } else if (n >= 10) {
      return word + " " + teens[n - 10];
    }
    word += ones[n];
    return word;
  }

  if (num === 0) return "zero";

  let words = "";
  let chunkCount = 0;
  while (num > 0) {
    if (num % 1000 > 0) {
      if (words !== "") words = " " + words;
      words = convertHundreds(num % 1000) + " " + units[chunkCount] + words;
    }
    num = Math.floor(num / 1000);
    chunkCount++;
  }

  return words.trim();
}

/**
 * Convert numbers to uppercase Chinese representation | 将数字转换为大写中文表示
 * @param {Number|String} num - Number or string to be converted | 要转换的数字或数字字符串
 * @returns {String} The uppercase Chinese representation of numbers | 数字的大写中文表示
 */
export function convertToChineseUpperCase(num) {
  // Verify if the input is valid
  // 验证输入是否有效
  if (num === undefined || num === null || isNaN(Number(num))) {
    return "Invalid input";
  }

  // Defining Numbers and Units
  // 定义数字和单位
  const digits = ["零", "壹", "贰", "叁", "肆", "伍", "陆", "柒", "捌", "玖"];
  const units = ["", "拾", "佰", "仟"];
  const sections = ["", "万", "亿", "兆"];

  // Special circumstances for 0
  // 0的特殊情况
  if (num === 0) {
    return "零";
  }

  // Convert numbers to strings
  // 把数字转换为字符串
  const numStr = String(num);

  // Divide numbers into groups of up to four digits
  // 将数字分割为最多四位的组
  let numSections = [];
  for (let i = numStr.length; i > 0; i -= 4) {
    numSections.unshift(numStr.substring(Math.max(i - 4, 0), i));
  }

  // Convert each group to Chinese words
  // 转换每一组
  let chineseStr = "";
  for (let index = 0; index < numSections.length; index++) {
    const section = numSections[index];
    let sectionChinese = "";
    let zeroFlag = false;

    for (let pos = 0; pos < section.length; pos++) {
      const digit = section[pos];
      const digitChinese = digits[digit];
      const unitIndex = section.length - pos - 1;
      if (digit === "0") {
        zeroFlag = true;
      } else {
        if (zeroFlag) {
          sectionChinese += digits[0];
          zeroFlag = false;
        }
        sectionChinese += digitChinese + units[unitIndex];
      }
    }

    // Avoid unnecessary "zeros"
    // 避免多余的“零”
    sectionChinese = sectionChinese.endsWith("零")
      ? sectionChinese.slice(0, -1)
      : sectionChinese;

    chineseStr +=
      sectionChinese +
      (sectionChinese ? sections[numSections.length - index - 1] : sections[0]);
  }

  // Clear excess "zeros"
  // 清除多余的“零”
  chineseStr = chineseStr.replace(/零+/g, "零");
  chineseStr = chineseStr.replace(/零(万|亿|兆)/g, "$1");
  chineseStr = chineseStr.replace(/亿万/, "亿");

  // For 10, 20 In the case of 90, simply return "ten", "twenty" Ninety
  // 对于10, 20, ... 90的情况，只需要返回"壹拾", "贰拾", ... "玖拾"
  if (numStr.length === 2 && numStr.charAt(1) === "0") {
    chineseStr = digits[numStr.charAt(0)] + "拾";
  }

  return chineseStr;
}

/**
 * Separate numbers by thousands | 将数字以千分位分隔
 * @param {Number|String} num  - Number or string to be separated | 要分隔的数字字符串
 * @param {String} [separator=','] - Delimiter, default to comma | 分隔符，默认为逗号
 * @returns {String} Separated numeric string | 分隔后的数字字符串
 */
export function separateNumberByThousands(num, separator = ",") {
  if (num === undefined || num === null || isNaN(Number(num))) {
    return "Invalid input"; // Ensure that the input is a valid number or numeric string | 确保输入是有效的数字或数字字符串
  }

  // Convert numbers to strings | 将数字转换为字符串
  const numStr = num.toString();

  // Using regular expressions to divide strings into integer and decimal parts | 使用正则表达式将字符串分割为整数部分和小数部分
  const parts = numStr.split(".");

  // Use regular expressions with delimiters for integer parts | 整数部分使用正则表达式加上分隔符
  parts[0] = parts[0].replace(/\B(?=(\d{3})+(?!\d))/g, separator);

  // Returns a combination of integer and decimal parts | 返回整数和小数部分的组合
  return parts.join(".");
}

/**
 * Convert integers to Roman numerals | 将整数转换为罗马数字
 * @param {Number|String} num - Number or string to be converted | 要转换的整数或者整数字符串
 * @returns {String} The Roman numeral representation of numbers | 罗马数字表示
 */
export function convertToRomanNumerals(num) {
  if (typeof num !== "number" || num < 1 || num > 3999) {
    throw new Error("Input must be an integer between 1 and 3999");
  }

  const romanNumerals = [
    { value: 1000, numeral: "M" },
    { value: 900, numeral: "CM" },
    { value: 500, numeral: "D" },
    { value: 400, numeral: "CD" },
    { value: 100, numeral: "C" },
    { value: 90, numeral: "XC" },
    { value: 50, numeral: "L" },
    { value: 40, numeral: "XL" },
    { value: 10, numeral: "X" },
    { value: 9, numeral: "IX" },
    { value: 5, numeral: "V" },
    { value: 4, numeral: "IV" },
    { value: 1, numeral: "I" },
  ];

  let result = "";

  for (let i = 0; i < romanNumerals.length; i++) {
    while (num >= romanNumerals[i].value) {
      result += romanNumerals[i].numeral;
      num -= romanNumerals[i].value;
    }
  }

  return result;
}

/**
 * Convert Roman numerals to integers | 将罗马数字转换为整数
 * @param {String} s - Roman numerals to be converted | 要转换的罗马数字
 * @returns {Number} Corresponding integer value | 对应的整数值
 */
export function convertRomanToInteger(s) {
  const romanNumerals = {
    I: 1,
    V: 5,
    X: 10,
    L: 50,
    C: 100,
    D: 500,
    M: 1000,
  };

  let result = 0;
  let prevValue = 0;

  for (let i = s.length - 1; i >= 0; i--) {
    const currentNumeral = s[i];
    const currentValue = romanNumerals[currentNumeral];

    if (currentValue < prevValue) {
      result -= currentValue;
    } else {
      result += currentValue;
    }

    prevValue = currentValue;
  }

  return result;
}

/**
 * 获取指定范围内的随机数
 * @param {Number} minNum - 随机数的最小值
 * @param {Number} maxNum - 随机数的最大值
 * @returns {Number} 随机数
 */
function getRandomNum(minNum, maxNum) {
  // 实现细节...
  // Todo
}

export default {
  convertNumberToWords,
  convertToChineseUpperCase,
  separateNumberByThousands,
  convertToRomanNumerals,
  convertRomanToInteger,
};
