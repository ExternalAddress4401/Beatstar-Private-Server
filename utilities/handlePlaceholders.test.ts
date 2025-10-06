import { createEmptyResponses } from "../protobuf/utils";
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

test("it should handle arrays of objects", () => {
  const data = {
    test: {
      nested: "{nested}",
    },
  };

  const replacements = {
    "{nested}": createEmptyResponses([
      { id: 1, rpcType: 1 },
      { id: 2, rpcType: 2 },
    ]),
  };

  const response = handlePlaceholders(data, replacements);
  console.log(response.test.nested);
});
