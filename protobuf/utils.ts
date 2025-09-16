export const pad = (str: string, length: number, char: string) => {
  while (str.length < length) {
    str = char + str;
  }
  return str;
};

export const chunk = (str: string) => {
  const result = [];
  for (let i = str.length; i > 0; i -= 7) {
    result.unshift(str.slice(Math.max(i - 7, 0), i));
  }
  return result;
};

export const createEmptyResponses = (requests) => {
  return requests.map(({ id, rpcType }) => ({
    id,
    rpcType,
    body: {},
  }));
};
