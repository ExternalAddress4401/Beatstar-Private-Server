/**
 * Converts an object into an array if it isn't
 * @param {any} param the object to convert
 * @returns {any[]} the object converted into an array
 */
export const toArray = (param: any): any[] => {
  if (!param) {
    return [];
  }
  return Array.isArray(param) ? param : [param];
};
