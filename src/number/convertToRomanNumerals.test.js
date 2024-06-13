import { convertToRomanNumerals } from ".";

describe('convertToRomanNumerals', () => {
  // 测试特定数字到罗马数字的转换
  test('converts integers to Roman numerals', () => {
    expect(convertToRomanNumerals(1)).toBe('I');
    expect(convertToRomanNumerals(4)).toBe('IV');
    expect(convertToRomanNumerals(9)).toBe('IX');
    expect(convertToRomanNumerals(58)).toBe('LVIII');
    expect(convertToRomanNumerals(1994)).toBe('MCMXCIV');
    expect(convertToRomanNumerals(3999)).toBe('MMMCMXCIX');
  });

  // 测试边界值
  test('handles the minimum and maximum limits', () => {
    expect(convertToRomanNumerals(1)).toBe('I');
    expect(convertToRomanNumerals(3999)).toBe('MMMCMXCIX');
  });

  // 测试无效的输入
  test('throws an error for invalid input types', () => {
    expect(() => convertToRomanNumerals('100')).toThrow('Input must be an integer between 1 and 3999');
    expect(() => convertToRomanNumerals(null)).toThrow('Input must be an integer between 1 and 3999');
    expect(() => convertToRomanNumerals(undefined)).toThrow('Input must be an integer between 1 and 3999');
    expect(() => convertToRomanNumerals({})).toThrow('Input must be an integer between 1 and 3999');
    expect(() => convertToRomanNumerals([])).toThrow('Input must be an integer between 1 and 3999');
  });

  // 测试无效的数字
  test('throws an error for numbers outside the valid range', () => {
    expect(() => convertToRomanNumerals(0)).toThrow('Input must be an integer between 1 and 3999');
    expect(() => convertToRomanNumerals(4000)).toThrow('Input must be an integer between 1 and 3999');
    expect(() => convertToRomanNumerals(-1)).toThrow('Input must be an integer between 1 and 3999');
  });

  // 测试非整数值
  test('throws an error for non-integer values', () => {
    expect(() => convertToRomanNumerals(4.5)).toThrow('Input must be an integer between 1 and 3999');
    expect(() => convertToRomanNumerals(1999.9)).toThrow('Input must be an integer between 1 and 3999');
  });
});