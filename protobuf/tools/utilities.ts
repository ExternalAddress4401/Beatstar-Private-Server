export const stringify = (data) => {
  return JSON.stringify(
    data,
    (_, v) => (typeof v === "bigint" ? v.toString() : v),
    2
  );
};
