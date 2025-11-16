/**
 * Capitalizes the first character of the string lowercasing the rest
 * @param {string} str string to capitalize
 * @returns Capitalized version of the string
 */
export const capitalize = (str: string) => {
  return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
};
