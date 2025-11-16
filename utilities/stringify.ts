/**
 * Converts a JSON object into a prettified string
 * @param {any} data the JSON object to convert
 * @returns {string} a pretty stringified version of the object
 */
export const stringify = (data: any): string => {
  return JSON.stringify(
    data,
    (_, v) => (typeof v === "bigint" ? Number(v) : v === undefined ? null : v),
    2
  );
};
