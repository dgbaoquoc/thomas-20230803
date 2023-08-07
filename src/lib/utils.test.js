import '@testing-library/jest-dom';
import { formatPrice, formatPercentage, formatDate, maxProfit } from "./utils";

describe("test @formatPrice function", () => {
  it('function @formatPrice number 12345 should return $12,345.00', () => {
    expect(formatPrice(12345)).toBe("$12,345.00");
  })
  it('function @formatPrice number 1 should return $1.00', () => {
    expect(formatPrice(1)).toBe("$1.00");
  })
});

describe("test @formatPercentage function", () => {
  it('function @formatPercentage number 0.312 should return 0.31%', () => {
    expect(formatPercentage(0.312)).toBe("0.31%");
  })
  it('function @formatPercentage number -0.312 should return 0.31%', () => {
    expect(formatPercentage(-0.312)).toBe("0.31%");
  })
});

describe("test @formatDate function", () => {
  it('function @formatDate date 2020-04-02T08:02:17-05:00 should return April 2, 2020', () => {
    expect(formatDate("2020-04-02T08:02:17-05:00")).toBe("April 2, 2020");
  })
});

describe("test no.2", () => {
  it('input [7,1,5,3,6,4] should return 5', () => {
    expect(maxProfit([7,1,5,3,6,4])).toBe(5);
  })
  it('input [7,6,4,3,1] should return 0', () => {
    expect(maxProfit([7,6,4,3,1])).toBe(0);
  })
});

