import { CMSField } from "../../interfaces/CMSField";

export const GachaBoxRewardTemplate: Map<number, CMSField> = new Map([
  [
    2,
    {
      name: "reward",
      type: "group",
      fields: new Map([[1, { name: "GachaBox_id", type: "varint" }]]),
    },
  ],
]);
