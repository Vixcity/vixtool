// 引入要测试的函数
import { getToday } from ".";

describe('getToday', () => {
    // 测试默认格式化
    test('uses the default format when no format is provided', () => {
      const today = new Date();
      const formattedToday = getToday();
      expect(formattedToday).toEqual(today.toISOString().slice(0, 10)); // 应该符合YYYY-MM-DD格式
    });
  
    // 测试自定义格式化
    test('accepts a custom format string', () => {
      const today = new Date();
      const customFormat = "YYYY/MM/DD";
      const expectedDate = today.getFullYear() + '/' + (today.getMonth() + 1).toString().padStart(2, '0') + '/' + today.getDate().toString().padStart(2, '0');
      const formattedToday = getToday(customFormat);
      // 由于我们不关心formatDate内部实现，这里直接比较预期结果
      expect(formattedToday).toEqual(expectedDate);
    });
  
    // 测试日期是当前日期
    test('returns the current date', () => {
      const now = new Date();
      jest.useFakeTimers('modern');
      jest.setSystemTime(now);
      const formattedToday = getToday();
      jest.useRealTimers(); // 恢复真实时间
      expect(formattedToday).toEqual(now.toISOString().slice(0, 10));
    });
  });