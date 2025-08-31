import { CMSField } from "../../interfaces/CMSField";

export const CosmeticGachaBoxRewardTemplate: Map<number, CMSField> = new Map([
  [
    2,
    {
      name: "reward",
      type: "group",
      fields: new Map([[3, { name: "trackSkins_id", type: "varint" }]]),
    },
  ],
]);
