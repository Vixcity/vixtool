import { convertNumberToWords } from ".";

describe("convertNumberToWords", () => {
  test("converts zero correctly", () => {
    expect(convertNumberToWords(0)).toBe("zero");
  });

  test("converts single digit numbers correctly", () => {
    expect(convertNumberToWords(5)).toBe("five");
  });

  test("converts teens correctly", () => {
    expect(convertNumberToWords(15)).toBe("fifteen");
  });

  test("converts tens correctly", () => {
    expect(convertNumberToWords(20)).toBe("twenty");
    expect(convertNumberToWords(37)).toBe("thirty-seven");
  });

  test("converts hundreds correctly", () => {
    expect(convertNumberToWords(100)).toBe("one hundred");
    expect(convertNumberToWords(123)).toBe("one hundred twenty-three");
  });

  test("converts thousands correctly", () => {
    expect(convertNumberToWords(1000)).toBe("one thousand");
    expect(convertNumberToWords(1234)).toBe(
      "one thousand two hundred thirty-four"
    );
  });

  test("converts millions correctly", () => {
    expect(convertNumberToWords(1234567)).toBe(
      "one million two hundred thirty-four thousand five hundred sixty-seven"
    );
  });

  test("converts billions correctly", () => {
    expect(convertNumberToWords(1234567890)).toBe(
      "one billion two hundred thirty-four million five hundred sixty-seven thousand eight hundred ninety"
    );
  });

  test('returns "Number out of range" for negative numbers', () => {
    expect(convertNumberToWords(-1)).toBe("Number out of range");
  });

  test('returns "Number out of range" for numbers greater than 999999999999999', () => {
    expect(convertNumberToWords(1000000000000000)).toBe("Number out of range");
  });
});
