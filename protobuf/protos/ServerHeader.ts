import { CMSField } from "../interfaces/CMSField";

export const proto: Map<number, CMSField> = new Map([
  [1, { name: "id", type: "string" }],
  [2, { name: "timestamp", type: "varint" }],
  [3, { name: "tokenId", type: "string" }],
  [7, { name: "compressed", type: "boolean" }],
]);
