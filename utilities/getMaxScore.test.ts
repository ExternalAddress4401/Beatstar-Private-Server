import { getMaxScore } from "./getMaxScore";

it("Should return the correct maximum for normal maps", () => {
  expect(getMaxScore(4)).toBe(50000);
});

it("Should return the correct maximum for hard maps", () => {
  expect(getMaxScore(3)).toBe(75000);
});

it("Should return the correct maximum for extreme maps", () => {
  expect(getMaxScore(1)).toBe(100000);
});

it("Should return the correct maximum for tutorial maps", () => {
  expect(getMaxScore(5)).toBe(50000);
});
