import { CMSField } from "../../../../../../interfaces/CMSField";
import { SkinSetToGenreTO } from "./SkinSetToGenreTO";

export const PlayerTrackSkinsTO: Map<number, CMSField> = new Map([
  [1, { name: "owned_id", type: "varint-repeat" }],
  [2, { name: "skinsSetToGenres", type: "packed", fields: SkinSetToGenreTO }],
  [3, { name: "globalSkin_id", type: "varint" }],
]);
