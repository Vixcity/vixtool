import { calculateDateDifference } from ".";

describe("calculateDateDifference", () => {
  test("throws an error when startDate is not provided", () => {
    expect(() => {
      calculateDateDifference({ endDate: new Date() });
    }).toThrow("Both startDate and endDate must be provided.");
  });

  test("throws an error when endDate is not provided", () => {
    expect(() => {
      calculateDateDifference({ startDate: new Date() });
    }).toThrow("Both startDate and endDate must be provided.");
  });

  test("throws an error when startDate is invalid", () => {
    expect(() => {
      calculateDateDifference({ startDate: "not-a-date", endDate: new Date() });
    }).toThrow("Invalid date format provided.");
  });

  test("throws an error when endDate is invalid", () => {
    expect(() => {
      calculateDateDifference({ startDate: new Date(), endDate: "not-a-date" });
    }).toThrow("Invalid date format provided.");
  });

  test("calculates difference in days", () => {
    const startDate = new Date(2020, 0, 1); // January 1, 2020
    const endDate = new Date(2020, 0, 2); // January 2, 2020
    expect(calculateDateDifference({ startDate, endDate, unit: "days" })).toBe(
      1
    );
  });

  test("calculates difference in hours", () => {
    const startDate = new Date(2020, 0, 1, 0, 0, 0); // January 1, 2020, 00:00:00
    const endDate = new Date(2020, 0, 1, 1, 0, 0); // January 1, 2020, 01:00:00
    expect(calculateDateDifference({ startDate, endDate, unit: "hours" })).toBe(
      1
    );
  });

  test("calculates difference in months", () => {
    const startDate = new Date(2020, 0, 1); // January 1, 2020
    const endDate = new Date(2020, 1, 1); // February 1, 2020
    expect(
      calculateDateDifference({ startDate, endDate, unit: "months" })
    ).toBe(1);
  });

  test("calculates difference in years", () => {
    const startDate = new Date(2020, 0, 1); // January 1, 2020
    const endDate = new Date(2021, 0, 1); // January 1, 2021
    expect(calculateDateDifference({ startDate, endDate, unit: "years" })).toBe(
      1
    );
  });

  test("swaps startDate and endDate if startDate is after endDate", () => {
    const startDate = new Date(2021, 0, 1); // January 1, 2021
    const endDate = new Date(2020, 0, 1); // January 1, 2020
    expect(
      calculateDateDifference({ startDate, endDate, unit: "days" })
    ).toBeGreaterThan(0);
  });

  test("throws an error for invalid unit", () => {
    expect(() => {
      calculateDateDifference({
        startDate: new Date(),
        endDate: new Date(),
        unit: "decades",
      });
    }).toThrow("Invalid unit: decades");
  });
});
