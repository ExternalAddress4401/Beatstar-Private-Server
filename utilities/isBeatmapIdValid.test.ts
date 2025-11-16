import { isBeatmapIdValid } from "./isBeatmapIdValid";

it("Should return true for valid beatmaps", () => {
  expect(isBeatmapIdValid(5000)).toBe(true);
});

it("Should return false for invalid beatmaps", () => {
  expect(isBeatmapIdValid(9593945385838)).toBe(false);
});
