import { medalToNormalStar, scoreToMedal } from "./scoreToMedal";

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

test("it should return proper middle scores for deluxe", () => {
  expect(scoreToMedal(67490, 3, true)).toBe(3);
});

test("it should return a normal 1 star", () => {
  expect(medalToNormalStar(1)).toBe(1);
});

test("it should return a normal 2 star", () => {
  expect(medalToNormalStar(2)).toBe(2);
});

test("it should return a normal 3 star", () => {
  expect(medalToNormalStar(5)).toBe(3);
});

test("it should return a normal 4 star", () => {
  expect(medalToNormalStar(3)).toBe(4);
});

test("it should return a normal 5 star", () => {
  expect(medalToNormalStar(4)).toBe(5);
});

/*ONE_STAR = 1
TWO_STAR = 2
FOUR_STAR = 3 <-- no this isn't wrong, it's supposed to be 3
FIVE_STAR = 4
THREE_STAR = 5*/
