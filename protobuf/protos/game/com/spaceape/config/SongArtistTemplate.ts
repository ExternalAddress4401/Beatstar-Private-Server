import { CMSField } from "../../../../../interfaces/CMSField";

export const SongArtistTemplate: Map<number, CMSField> = new Map([
  [1, { name: "id", type: "string" }],
  [2, { name: "trivia_id", type: "string-repeat" }],
  [3, { name: "albumArtSuitableForLoadingScreen", type: "boolean" }],
]);
