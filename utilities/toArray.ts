export const toArray = (param) => {
  if (!param) {
    return [];
  }
  return Array.isArray(param) ? param : [param];
};
