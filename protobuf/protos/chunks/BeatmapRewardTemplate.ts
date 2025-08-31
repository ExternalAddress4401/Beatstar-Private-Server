import { CMSField } from "../../interfaces/CMSField";

export const BeatmapRewardTemplate: Map<number, CMSField> = new Map([
  [
    2,
    {
      name: "reward",
      type: "group",
      fields: new Map([[1, { name: "Beatmap_id", type: "varint" }]]),
    },
  ],
]);
