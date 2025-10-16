import { CMSField } from "../../../../../interfaces/CMSField";

export const GameSKU: Map<number, CMSField> = new Map([
  [1, { name: "id", type: "varint" }],
  [2, { name: "idLabel", type: "string" }],
]);
