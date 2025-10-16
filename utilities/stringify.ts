export const stringify = (data: any) => {
  return JSON.stringify(
    data,
    (_, v) => (typeof v === "bigint" ? Number(v) : v),
    2
  );
};
