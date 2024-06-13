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
    throw new Error(
      "Invalid date provided. Falling back to current date and time."
    );
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
 * Get the current date and time in the specified format | 获取当前日期和时间，以指定格式显示
 *
 * @param {string} [format='YYYY-MM-DD HH:mm:ss'] - The format string. Default to "YYYY-MM-DD HH:mm:ss" | 日期时间的格式
 * @returns {string} The current date and time string in the specified format | 指定格式的当前日期和时间字符串
 */
export function getToday(format = "YYYY-MM-DD") {
  const today = new Date();
  return formatDate(today, format);
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
  if (typeof hours !== "number" || isNaN(Number(hours))) {
    throw new Error("args must be a number or string number");
  }

  hours = hours % 24;

  if (hours < 0) {
    hours = 24 - Math.abs(hours);
  }

  hours = Math.floor(hours);

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
  if (typeof dateString !== "string") {
    throw new Error("Invalid date input. Date must be a string.");
  }
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
  if (typeof year !== "number" || year < 1 || !Number.isInteger(year)) {
    return false;
  }
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

/**
 * Get the date that is a specified number of days before the given date | 获取指定天数之前的日期
 *
 * @param {Date|String} date - The date to get the date before | 要获取日期之前的日期
 * @param {number} days - The number of days to get before the given date | 要获取的天数
 * @param {string} [type='before'] - The type of date to get. Valid values are 'before' and 'after' | 获取日期的类型。有效值为'before'和'after'
 * @returns {Date} The date that is a specified number of days before the given date | 获取指定天数之前的日期
 */
export function getBeforeOrAfterDate(
  dateInput = new Date(),
  n = 0,
  type = "before"
) {
  let inputDate;

  // check input type and handle
  // 检查输入类型并处理
  if (typeof dateInput === "string") {
    // if it is a string, try to parse it into a Date object
    // 如果是字符串，尝试将其转换为 Date 对象
    inputDate = new Date(dateInput);
    if (isNaN(inputDate.getTime())) {
      throw new Error("Invalid date string");
    }
  } else if (dateInput instanceof Date) {
    // if it is a Date object, create a new instance to avoid modifying the original object
    // 如果已经是 Date 对象，直接使用
    inputDate = new Date(dateInput.getTime()); // create a new instance to avoid modifying the original object | 创建一个新实例，以避免修改原始对象
  } else {
    throw new Error("Invalid date input. Must be a string or a Date object");
  }

  // calculate the date before n days
  // 计算前 n 天的日期
  if (type === "before") {
    inputDate.setDate(inputDate.getDate() - n);
  } else if (type === "after") {
    inputDate.setDate(inputDate.getDate() + n);
  } else {
    throw new Error("Invalid date type. Must be 'before' or 'after'");
  }

  return formatDate(inputDate);
}

/**
 * Get the year range between two years | 获取两个年份之间的年份范围
 *
 * @param {number} [year1] - The first year. Default to current year | 第一个年份。默认为当前年份
 * @param {number} [year2] - The second year. Default to the first year | 第二个年份。默认为第一个年份
 * @param {string} [order='asc'] - The order of the year range. Valid values are 'asc' and 'desc' | 年份范围的顺序。有效值为'asc'和'desc'
 * @returns {Array} The year range between two years | 两个年份之间的年份范围
 */
export function getYearRange(year1, year2, order = "asc") {
  // get current year
  // 获取当前年份
  const currentYear = new Date().getFullYear();

  // Parameter processing
  // 参数处理
  year1 = year1 || currentYear;
  year2 = year2 || year1;

  // Ensure that year1 and year2 are numbers
  // 确保年份是数字
  year1 = typeof year1 === "string" ? parseInt(year1) : year1;
  year2 = typeof year2 === "string" ? parseInt(year2) : year2;

  // Validate that year1 and year2 are numbers
  // 验证年份是否是数字
  if (!Number.isInteger(year1) || !Number.isInteger(year2)) {
    throw new Error("Year values must be integers.");
  }

  // Ensure that year1 is less than or equal to year2
  // 确保year1比year2小
  if (year1 > year2) {
    [year1, year2] = [year2, year1];
  }

  // Validate order parameter
  // 验证order参数
  if (order !== "asc" && order !== "desc") {
    throw new Error("Invalid order parameter. Must be 'asc' or 'desc'");
  }

  // Ensure that year1 is within the valid range
  // 根据顺序生成年份数组
  const years = [];
  if (order === "asc") {
    for (let i = year1; i <= year2; i++) {
      years.push(i);
    }
  } else {
    for (let i = year2; i >= year1; i--) {
      years.push(i);
    }
  }

  // Return the year range
  // 返回年份数组
  return years;
}

/**
 * Get the seven days information of the given date | 获取给定日期的七天信息
 *
 * @param {Object} [options={}] - The options object | 选项对象
 * @param {string} [options.format='YYYY-MM-DD'] - The format string. Default to 'YYYY-MM-DD' | 日期格式字符串。默认为'YYYY-MM-DD'
 * @param {Date|String} [options.date=null] - The date to get the seven days information. Default to current date | 要获取七天信息的日期。默认为当前日期
 * @param {Array} [options.weekdays=["周日", "周一", "周二", "周三", "周四", "周五", "周六"]] - The weekday names. Default to Chinese weekdays | 星期名称数组。默认为中文星期名称
 * @param {boolean} [options.changeFirst=true] - Whether to change the first day to "今天" or not. Default to true | 是否将第一天改为"今天"。默认为true
 * @returns {Array} The seven days information array | 七天信息数组
 */
export function getSevenDaysInfo(options = {}) {
  const defaultOptions = {
    format: "YYYY-MM-DD",
    date: null,
    weekdays: ["周日", "周一", "周二", "周三", "周四", "周五", "周六"],
    changeFirst: false,
  };

  // merge default options and user provided options
  // 合并默认选项和用户提供的选项
  const mergedOptions = { ...defaultOptions, ...options };

  const { weekdays, changeFirst } = mergedOptions;
  let currentDate = mergedOptions.date
    ? new Date(mergedOptions.date)
    : new Date();
  let daysInfoArray = [];

  for (let i = 0; i < 7; i++) {
    // get the weekday
    // 获取星期几
    let weekday = weekdays[currentDate.getDay()];
    if (i === 0 && changeFirst) {
      // the first day is today
      // 第一天是今天
      weekday = "今天";
    }

    // get the date string based on the format
    // 根据格式生成日期字符串
    let dateStr = formatDate(currentDate, mergedOptions.format);

    // create an object to store the weekday and date string
    // 将结果添加到数组
    daysInfoArray.push({
      weekday,
      date: dateStr,
    });

    // move to the next day
    // 移动到下一天
    currentDate.setDate(currentDate.getDate() + 1);
  }

  return daysInfoArray;
}

export default {
  formatDate,
  getToday,
  formatAMPM,
  format12Hour,
  calculateDateDifference, // 未做
  parseDate,
  isLeapYear,
  calculateMonthsYearsDifference,
  getBeforeOrAfterDate,
  getYearRange,
  getSevenDaysInfo,
};
