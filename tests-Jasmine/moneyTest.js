import { formatCurrency } from "../scripts/utils/money.js";

describe("FORMAT CURRENCY", () => {
  it("converts cents into dollars", () => {
    expect(formatCurrency(2095)).toEqual("20.95");
  });

  it("converts zero cents into dollars", () => {
    expect(formatCurrency(0)).toEqual("0.00");
  });
  
  it("converts decimal cents into dollars", () => {
    expect(formatCurrency(2000.5)).toEqual("20.01");
  });
})

