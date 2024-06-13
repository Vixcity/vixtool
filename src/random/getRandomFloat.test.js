import { getRandomFloat } from ".";

describe("getRandomFloat", () => {
  test("should return a number within the specified range", () => {
    const min = 1.23;
    const max = 5.67;
    const precision = 2;
    const result = getRandomFloat(min, max, precision);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });

  test("should return a number with the specified precision", () => {
    const min = 1.23;
    const max = 5.67;
    const precision = 2;
    const result = getRandomFloat(min, max, precision);
    const resultString = result.toFixed(precision);
    // 计算小数点后的字符数
    const decimalCount = resultString.split(".").pop().length;
    expect(decimalCount).toBe(precision);
  });

  test("should throw an error if precision is not a positive integer", () => {
    const min = 1.23;
    const max = 5.67;
    const precision = -2;
    expect(() => getRandomFloat(min, max, precision)).toThrow(
      "Precision must be a positive integer."
    );
  });

  test("should swap min and max if min is greater than max", () => {
    const min = 5.67;
    const max = 1.23;
    const precision = 2;
    const result = getRandomFloat(min, max, precision);
    expect(result).toBeGreaterThanOrEqual(max);
    expect(result).toBeLessThanOrEqual(min);
  });

  test("should handle min and max as integers", () => {
    const min = 1;
    const max = 10;
    const precision = 0;
    const result = getRandomFloat(min, max, precision);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
    expect(Number.isInteger(result)).toBe(true);
  });

  test("should handle min and max as negative numbers", () => {
    const min = -10;
    const max = -1;
    const precision = 1;
    const result = getRandomFloat(min, max, precision);
    expect(result).toBeGreaterThanOrEqual(min);
    expect(result).toBeLessThanOrEqual(max);
  });

  test("should handle precision as zero", () => {
    const min = 1.23;
    const max = 5.67;
    const precision = 0;
    const result = getRandomFloat(min, max, precision);
    expect(Number.isInteger(result)).toBe(true);
  });
});
