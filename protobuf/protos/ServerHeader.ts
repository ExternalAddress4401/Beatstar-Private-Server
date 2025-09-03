import { CMSField } from "../interfaces/CMSField";

export const ServerHeader: Map<number, CMSField> = new Map([
  [1, { name: "id", type: "string" }],
  [2, { name: "timestamp", type: "varint" }],
  [3, { name: "tokenId", type: "string" }],
  [7, { name: "compressed", type: "boolean" }],
]);
