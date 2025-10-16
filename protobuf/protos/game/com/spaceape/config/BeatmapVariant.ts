import { CMSField } from "../../../../../interfaces/CMSField";

export const BeatmapVariant: Map<number, CMSField> = new Map([
  [1, { name: "id", type: "varint" }],
  [2, { name: "idLabel", type: "string" }],
  [3, { name: "Song_id", type: "varint" }],
  [4, { name: "MaxNumLanes", type: "varint" }],
  [5, { name: "MaxScore", type: "varint" }],
  [6, { name: "Difficulty_id", type: "varint" }],
  [8, { name: "Version", type: "varint" }],
  [9, { name: "isComplete", type: "varint" }],
  [10, { name: "InteractionsReference_id", type: "varint" }],
  [12, { name: "NumStars", type: "varint" }],
  [13, { name: "InteractionsAsset_id", type: "string" }],
  [14, { name: "botScoreCurve", type: "group", fields: new Map([]) }],
  [15, { name: "Description", type: "string" }],
  [16, { name: "BeatmapType", type: "varint" }],
]);
