import { handlePlaceholders } from "./handlePlaceholders";

test("it should replace placeholders", () => {
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
