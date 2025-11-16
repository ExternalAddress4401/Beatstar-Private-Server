import { isUUID } from "./isUuid";

it("Should return true for valid UUIDs", () => {
  expect(isUUID("bfffac49-b814-4aed-887e-2b0c8f9bdab1")).toBe(true);
});

it("Should return false for valid UUIDs", () => {
  expect(isUUID("bfffac49-b814-4aed-887e-2b0c8f9bdqb1")).toBe(false);
  expect(isUUID("Hello")).toBe(false);
});
