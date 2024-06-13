import { parseDate } from ".";

describe("parseDate", () => {
  // 测试有效的日期字符串
  test("parses a valid date string to a Date object", () => {
    const validDateString = "2024-01-01";
    const expectedDate = new Date(validDateString);
    const parsedDate = parseDate(validDateString);
    expect(parsedDate).toEqual(expectedDate);
    expect(parsedDate.getTime()).toBe(expectedDate.getTime());
  });

  // 测试无效的日期字符串
  test("throws an error for an invalid date string", () => {
    const invalidDateString = "not-a-date-string";
    expect(() => {
      parseDate(invalidDateString);
    }).toThrow("Invalid date format provided.");
  });

  // 测试日期字符串的边界情况，例如闰年的2月29日
  test("parses a leap year date string correctly", () => {
    const leapYearDate = "2024-02-29";
    const parsedDate = parseDate(leapYearDate);
    expect(parsedDate).toBeInstanceOf(Date);
    expect(parsedDate.toISOString().includes(leapYearDate)).toBeTruthy();
  });

  // 测试包含时间组件的日期字符串的解析
test('parses date strings with time components correctly', () => {
    const dateTimeString = '2024-01-01T12:00:00';
    const parsedDate = parseDate(dateTimeString);
    expect(parsedDate).toBeInstanceOf(Date);
    // 提取输入字符串中的时间部分
    const inputTime = dateTimeString.substring(11); // "T"后的"HH:MM:SS"部分
    // 比较解析后的时间部分是否与输入的时间部分相同
    expect(parsedDate.toTimeString().slice(0, 8)).toBe(inputTime);
  });

  // 测试空字符串或非字符串输入
  test("throws an error for empty or non-string input", () => {
    expect(() => {
      parseDate("");
    }).toThrow("Invalid date format provided.");

    expect(() => {
      parseDate(123456); // 非字符串输入
    }).toThrow("Invalid date input. Date must be a string.");
  });
});
