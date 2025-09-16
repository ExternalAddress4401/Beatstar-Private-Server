import { CMSField } from "../../interfaces/CMSField";

export const TrackSkinRewardTemplate: Map<number, CMSField> = new Map([
  [
    2,
    {
      name: "reward",
      type: "group",
      fields: new Map([[1, { name: "trackSkin_id", type: "varint" }]]),
    },
  ],
]);
