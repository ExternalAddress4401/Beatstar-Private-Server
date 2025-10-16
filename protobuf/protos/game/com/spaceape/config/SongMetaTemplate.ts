import { CMSField } from "../../../../../interfaces/CMSField";

export const SongMetaTemplate: Map<number, CMSField> = new Map([
  [1, { name: "id", type: "varint" }],
  [2, { name: "idLabel", type: "string" }],
]);
