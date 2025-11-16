import { handlePlaceholders } from "./handlePlaceholders";

it("Should replace placeholders", () => {
  const data = {
    test: {
      nested: {
        placeholder: "{placeholder}",
      },
    },
  };

  const replacements = {
    "{placeholder}": "Cool thing",
  };

  const response = handlePlaceholders(data, replacements);
  expect(response).toEqual({ test: { nested: { placeholder: "Cool thing" } } });
});
