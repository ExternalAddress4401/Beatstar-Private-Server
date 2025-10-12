import { scoreToMedal } from "./scoreToMedal";

test("it should return proper 0 scores", () => {
  expect(scoreToMedal(0, 1, false)).toBe(1);
});

test("it should return proper perfect scores", () => {
  expect(scoreToMedal(100000, 1, false)).toBe(8);
});

test("it should return proper less than perfect scores", () => {
  expect(scoreToMedal(99999, 1, false)).toBe(8);
});

test("it should return proper middle scores", () => {
  expect(scoreToMedal(80001, 1, false)).toBe(3);
});

test("it should return proper middle scores for deluxe", () => {
  expect(scoreToMedal(98700, 1, true)).toBe(7);
});
