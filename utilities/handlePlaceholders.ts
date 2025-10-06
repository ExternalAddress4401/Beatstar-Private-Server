export const handlePlaceholders = (
  data: any,
  placeholders: Record<string, any>
) => {
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
