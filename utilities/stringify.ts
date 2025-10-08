export const stringify = (data: any) => {
  return JSON.stringify(
    data,
    (_, v) => (typeof v === "bigint" ? v.toString() : v),
    2
  );
};
