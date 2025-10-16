import { CMSField } from "../../../../../interfaces/CMSField";

export const SongTag: Map<number, CMSField> = new Map([
  [1, { name: "id", type: "varint" }],
  [14, { name: "idLabel", type: "string" }],
  [21, { name: "sku_id", type: "varint" }],
]);
