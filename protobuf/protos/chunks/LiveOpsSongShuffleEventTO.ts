import { CMSField } from "../../interfaces/CMSField";

export const LiveOpsSongShuffleEventTO: Map<number, CMSField> = new Map([
  [2, { name: "pickedBeatmaps_id", type: "varint-repeat" }],
]);
