const { getSevenDaysInfo } = require("."); // 替换为你的文件路径

describe("getSevenDaysInfo", () => {
  test("should return an array of seven days starting from today with default format", () => {
    const result = getSevenDaysInfo();
    expect(result).toHaveLength(7);
    expect(result[0].date).toMatch(/^\d{4}-\d{2}-\d{2}$/); // 默认格式 YYYY-MM-DD
  });

  test("should return an array of seven days starting from today with custom format", () => {
    const result = getSevenDaysInfo({ format: "MM-DD" });
    expect(result).toHaveLength(7);
    expect(result[0].date).toMatch(/^\d{2}-\d{2}$/); // 自定义格式 MM-DD
  });

  test("should return an array of seven days starting from a specified date with custom format", () => {
    const result = getSevenDaysInfo({
      format: "YYYY-MM-DD",
      date: "2023-03-01",
    });
    expect(result).toHaveLength(7);
    expect(result[0].date).toMatch(/^\d{4}-\d{2}-\d{2}$/); // 自定义格式 YYYY-MM-DD
    expect(result[0].date).toBe("2023-03-01"); // 确保从指定日期开始
  });

  test("should handle leap years correctly", () => {
    const result = getSevenDaysInfo({
      format: "YYYY-MM-DD",
      date: "2024-02-28",
    });
    expect(result).toHaveLength(7);
    expect(result[1].date).toBe("2024-02-29"); // 2024年是闰年，应该包含2月29日
  });

  test("should first is today", () => {
    const result = getSevenDaysInfo({
      format: "YYYY-MM-DD",
      date: "2024-02-28",
      changeFirst: true,
    });
    expect(result).toHaveLength(7);
    expect(result[0].weekday).toBe("今天"); // 如果更改今天的日期,那么第一个就为今天
  });
});
