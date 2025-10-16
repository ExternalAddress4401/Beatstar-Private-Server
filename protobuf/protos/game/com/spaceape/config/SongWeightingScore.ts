import { CMSField } from "../../../../../interfaces/CMSField";

export const SongWeightingScore: Map<number, CMSField> = new Map([
  [1, { name: "tag_id", type: "varint" }],
  [2, { name: "weight3dp", type: "varint" }],
]);
