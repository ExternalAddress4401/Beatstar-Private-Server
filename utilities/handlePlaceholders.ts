/**
 * Recursively replaces placeholders in a nexted object
 * @param {any} data the object to be search through
 * @param {Record<string, any>} placeholders a map of placeholders to replace
 * @returns {any} an object with the placeholders replaced
 */
export const handlePlaceholders = (
  data: any,
  placeholders: Record<string, any>
): any => {
  for (const key of Object.keys(data)) {
    if (typeof data[key] === "object") {
      handlePlaceholders(data[key], placeholders);
    }
    if (placeholders[data[key]]) {
      data[key] = placeholders[data[key]];
    }
  }

  return data;
};
