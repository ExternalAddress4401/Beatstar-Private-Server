import { CMSField } from "../../../../../interfaces/CMSField";

export const SongDifficulty: Map<number, CMSField> = new Map([
  [1, { name: "id", type: "varint" }],
  [3, { name: "difficulty", type: "varint" }],
  [15, { name: "idLabel", type: "string" }],
]);
