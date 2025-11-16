import { capitalize } from "./capitalize";

it("Should capitaize a string", () => {
  expect(capitalize("hello")).toBe("Hello");
});

it("Should lowercase the rest of the string", () => {
  expect(capitalize("hELLO")).toBe("Hello");
});
