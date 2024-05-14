/**
 * 格式化日期和时间
 *
 * @param {Date} [date=new Date()] - The date object to format. Default to current time | 要格式化的日期对象。默认为当前时间
 * @param {string} [format='YYYY-MM-DD HH:mm:ss'] - The format string. Default to "YYYY-MM-DD HH:mm:ss" | 日期时间的格式
 * @returns {string} The formatted date and time string | 格式化后的日期时间字符串
 * @throws {Error} If the provided date object is invalid | 如果提供的日期对象无效
 */
export function formatDate(date = new Date(), format = "YYYY-MM-DD") {
  // if the provided date object is invalid, throw an error and log a warning to the console
  // 如果传入的date不是一个有效的Date对象，抛出错误并在控制台上警告
  if (!(date instanceof Date) || isNaN(date.getTime())) {
    console.warn(
      "Invalid date provided. Falling back to current date and time."
    );
    return undefined;
  }

  // Define a replacement function for date and time
  // 定义日期和时间的替换函数
  const replacements = {
    YYYY: () => date.getFullYear(),
    yyyy: () => date.getFullYear(),
    MM: () => String(date.getMonth() + 1).padStart(2, "0"),
    dd: () => String(date.getDate()).padStart(2, "0"),
    DD: () => String(date.getDate()).padStart(2, "0"),
    HH: () => String(date.getHours()).padStart(2, "0"),
    mm: () => String(date.getMinutes()).padStart(2, "0"),
    ss: () => String(date.getSeconds()).padStart(2, "0"),
    hh: () => format12Hour(date.getHours()),
    a: () => formatAMPM(date),
  };

  // Replace the format string with the corresponding date and time values
  // 根据传入的format进行替换
  return format.replace(/YYYY|MM|DD|HH|mm|ss|hh|a/g, (match) => {
    return replacements[match]();
  });
}

/**
 * 格式化日期和时间的上午/下午
 *
 * @param {Date} [date=new Date()] - The date object to format. Default to current time | 要格式化的日期对象。默认为当前时间
 * @returns {string} The formatted AM/PM string | 格式化后的上午/下午字符串
 */
export function formatAMPM(date = new Date()) {
  // AM/PM format function
  // 上午/下午格式化函数
  return date.getHours() >= 12 ? "PM" : "AM";
}

/**
 * 格式化日期和时间的12小时制小时
 *
 * @param {number} hours - The hour to format. | 要格式化的小时数
 * @returns {string} The formatted 12-hour string | 格式化后的12小时制字符串
 */
export function format12Hour(hours) {
  // 12 hour hour format function
  // 12小时制的小时格式化函数
  const isPM = hours >= 12;
  const adjustedHours = isPM ? hours - 12 : hours;
  return adjustedHours === 0 ? "12" : String(adjustedHours).padStart(2, "0");
}

/**
 * Calculate the difference between two dates | 计算两个日期之间的差值
 *
 * @param {Object} options - Objects containing options such as start date, end date, and output unit | 包含开始日期、结束日期和输出单位等选项的对象
 * @param {string|Date} options.startDate - Start date, which can be a Date object or a date string (in the format of 'YYYY-MM-DD') | 开始日期，可以是Date对象或日期字符串（格式为'YYYY-MM-DD'）
 * @param {string|Date} options.endDate - End date, which can be a Date object or a date string (in the format of 'YYYY-MM-DD') | 结束日期，可以是Date对象或日期字符串（格式为'YYYY-MM-DD'）
 * @param {string} [options.unit='days'] - The output unit. Valid values are 'days', 'hours','minutes','seconds','milliseconds','months', 'years' | 输出单位，可选值为'days', 'hours', 'minutes', 'seconds', 'milliseconds', 'months', 'years'
 * @returns {number} The difference between the two dates in the specified unit | 返回指定单位下的差值
 * @throws {Error} Throw an error when the provided date format is incorrect or missing necessary parameters | 当提供的日期格式不正确或缺少必要参数时抛出错误
 */
export function calculateDateDifference(options) {
  // Validate options
  // 验证参数
  if (!options || !options.startDate || !options.endDate) {
    throw new Error("Both startDate and endDate must be provided.");
  }

  let startDate =
    options.startDate instanceof Date
      ? options.startDate
      : parseDate(options.startDate);
  let endDate =
    options.endDate instanceof Date
      ? options.endDate
      : parseDate(options.endDate);

  // Ensure that the start date is before the end date, and if not, swap them
  // 确保开始日期在结束日期之前，如果不是，则交换它们
  if (startDate > endDate) {
    [startDate, endDate] = [endDate, startDate];
  }

  // Calculate the difference in milliseconds
  // 计算日期差值（毫秒）
  const diffInMilliseconds = endDate - startDate;

  // Return the difference based on the specified unit
  // 根据指定的单位返回差值
  switch (options.unit.toLowerCase()) {
    case "days":
      return Math.floor(diffInMilliseconds / (1000 * 60 * 60 * 24));
    case "hours":
      return Math.floor(diffInMilliseconds / (1000 * 60 * 60));
    case "minutes":
      return Math.floor(diffInMilliseconds / (1000 * 60));
    case "seconds":
      return Math.floor(diffInMilliseconds / 1000);
    case "milliseconds":
      return Math.floor(diffInMilliseconds);
    case "months":
      return calculateMonthsYearsDifference(startDate, endDate).months;
    case "years":
      return calculateMonthsYearsDifference(startDate, endDate).years;
    default:
      throw new Error(
        `Invalid unit: ${options.unit}. Valid units are 'days', 'hours', 'minutes', 'seconds', 'milliseconds', 'months', 'years'.`
      );
  }
}

/**
 * Parse a date string into a Date object | 将日期字符串解析为Date对象
 *
 * @param {string} dateString - The date string to parse | 要解析的日期字符串
 * @returns {Date} The parsed Date object | 解析后的Date对象
 * @throws {Error} Throw an error when the provided date format is incorrect | 当提供的日期格式不正确时抛出错误
 */
export function parseDate(dateString) {
  const date = new Date(dateString);
  if (isNaN(date.getTime())) {
    throw new Error("Invalid date format provided.");
  }
  return date;
}

/**
 * Auxiliary function: Check if it is a leap year | 辅助函数：检查是否是闰年
 *
 * @param {number} year - year | 年份
 * @returns {boolean} isLeapYear | 是否是闰年
 */
export function isLeapYear(year) {
  return (year % 4 === 0 && year % 100 !== 0) || year % 400 === 0;
}

/**
 * Auxiliary function: Calculate the difference between months and years | 辅助函数：计算月和年的差值
 *
 * @param {Date} startDate - The start date | 开始日期
 * @param {Date} endDate - The end date | 结束日期
 * @returns {Object} An object with properties 'years' and'months' | 包含'years'和'months'属性的对象
 */
export function calculateMonthsYearsDifference(startDate, endDate) {
  let months = 0;
  let years = 0;
  let tempDate = new Date(startDate);

  while (tempDate <= endDate) {
    if (
      tempDate.getMonth() === 1 &&
      isLeapYear(tempDate.getFullYear()) &&
      tempDate.getDate() === 29
    ) {
      // If it is February 29th in a leap year, special handling is required
      // 如果是闰年的2月29日，需要特殊处理
      tempDate.setDate(28);
    }

    tempDate.setMonth(tempDate.getMonth() + 1);

    if (tempDate.getMonth() === 0) {
      // straddle old and new years
      // 跨年
      years++;
    }
    months++;

    // If the date is rolled back, it means that the current month's days have been traversed, and the date is set to the day before the first day of the next month
    // 如果日期回滚，表示当前月份天数已经遍历完，设置日期为下月第一天的前一天
    if (tempDate.getDate() !== 1) {
      // Set as the last day of the current month
      // 设置为当前月的最后一天
      tempDate.setDate(0);
    }
  }

  // Subtract the additional month (because tempDate in the while loop will exceed endDate)
  // 减去多加的一个月（因为while循环中tempDate会超过endDate）
  if (tempDate > endDate) {
    months--;

    // If both years are crossed, one year needs to be subtracted
    // 如果同时跨越了年份，需要减去一年
    if (tempDate.getFullYear() !== endDate.getFullYear()) {
      years--;
    }
  }

  return { months, years };
}

export default {
  formatDate,
  formatAMPM,
  format12Hour,
  isLeapYear,
  calculateMonthsYearsDifference,
  calculateDateDifference,
  parseDate,
};
