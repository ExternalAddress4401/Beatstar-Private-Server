import { CMSField } from "../../../../../interfaces/CMSField";

export const SongBanGroup: Map<number, CMSField> = new Map([
  [1, { name: "id", type: "string" }],
  [4, { name: "blanketBanned", type: "boolean" }],
  [6, { name: "removalType", type: "varint" }],
  [7, { name: "hideCoverArt", type: "boolean" }],
]);
