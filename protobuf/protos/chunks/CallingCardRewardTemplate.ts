import { CMSField } from "../../interfaces/CMSField";

export const CallingCardRewardTemplate: Map<number, CMSField> = new Map([
  [
    2,
    {
      name: "reward",
      type: "group",
      fields: new Map([[1, { name: "callingCard_id", type: "varint" }]]),
    },
  ],
]);
