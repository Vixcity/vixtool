// 引入要测试的函数
import { getYearRange } from "."; // 假设您的函数在dateUtils.js文件中

describe("getYearRange", () => {
  // 测试默认参数
  test("returns the current year when no arguments are provided", () => {
    const currentYear = new Date().getFullYear();
    expect(getYearRange()).toEqual([currentYear]);
  });

  // 测试升序排列
  test('returns years in ascending order when order is "asc"', () => {
    const year1 = 2000;
    const year2 = 2020;
    const expected = Array.from(
      { length: year2 - year1 + 1 },
      (_, i) => i + year1
    );
    expect(getYearRange(year1, year2, "asc")).toEqual(expected);
  });

  // 测试降序排列
  test('returns years in descending order when order is "desc"', () => {
    const year1 = 2020;
    const year2 = 2000;
    const expected = Array.from(
      { length: year1 - year2 + 1 },
      (_, i) => year1 - i
    );
    expect(getYearRange(year1, year2, "desc")).toEqual(expected);
  });

  // 测试年份参数为字符串
  test("handles year arguments provided as strings", () => {
    const year1 = "2000";
    const year2 = "2020";
    expect(getYearRange(year1, year2)).toEqual([
      2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011,
      2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
    ]); // 省略中间年份以节省空间
  });

  // 测试year1和year2相等
  test("returns a single year when year1 and year2 are the same", () => {
    const year = 2020;
    expect(getYearRange(year, year)).toEqual([year]);
  });

  // 测试year1大于year2时的自动调整
  test("swaps year1 and year2 if year1 is greater than year2", () => {
    const year1 = 2020;
    const year2 = 2000;
    expect(getYearRange(year1, year2)).toEqual([
      2000, 2001, 2002, 2003, 2004, 2005, 2006, 2007, 2008, 2009, 2010, 2011,
      2012, 2013, 2014, 2015, 2016, 2017, 2018, 2019, 2020,
    ]); // 省略中间年份以节省空间
  });

  // 测试无效的排序参数
  test("throws an error for invalid order parameters", () => {
    expect(() => {
      getYearRange(2000, 2020, "invalid");
    }).toThrow("Invalid order parameter. Must be 'asc' or 'desc'");
  });
});
