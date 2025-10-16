import { CMSField } from "../../../../../../interfaces/CMSField";

export const SkinSetToGenreTO: Map<number, CMSField> = new Map([
  [1, { name: "genre_id", type: "varint" }],
  [2, { name: "skin_id", type: "varint" }],
]);
