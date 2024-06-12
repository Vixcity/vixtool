// 引入要测试的函数
import { formatAMPM } from "."; // 假设您的函数在dateUtils.js文件中

describe("formatAMPM", () => {
  // 测试午夜（00:00）时返回AM
  test('returns "AM" for midnight (00:00)', () => {
    const date = new Date("2024-06-12T00:00:00");
    expect(formatAMPM(date)).toBe("AM");
  });

  // 测试上午时间（01:00 - 11:59）返回AM
  test('returns "AM" for morning hours (01:00 - 11:59)', () => {
    const morningDates = [
      new Date("2024-06-12T01:00:00"),
      new Date("2024-06-12T05:30:00"),
      new Date("2024-06-12T11:59:59"),
    ];
    morningDates.forEach((date) => {
      expect(formatAMPM(date)).toBe("AM");
    });
  });

  // 测试正午（12:00）时返回PM
  test('returns "PM" for noon (12:00)', () => {
    const date = new Date("2024-06-12T12:00:00");
    expect(formatAMPM(date)).toBe("PM");
  });

  // 测试下午时间（12:01 - 23:59）返回PM
  test('returns "PM" for afternoon/evening hours (12:01 - 23:59)', () => {
    const afternoonDates = [
      new Date("2024-06-12T12:01:00"),
      new Date("2024-06-12T15:45:00"),
      new Date("2024-06-12T23:59:59"),
    ];
    afternoonDates.forEach((date) => {
      expect(formatAMPM(date)).toBe("PM");
    });
  });
});
