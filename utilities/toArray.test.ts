import { toArray } from "./toArray";

it("Should convert an object into an array", () => {
  expect(toArray({ a: 1 })).toEqual([{ a: 1 }]);
});

it("Should not convert arrays", () => {
  expect(toArray([{ a: 1 }])).toEqual([{ a: 1 }]);
});
