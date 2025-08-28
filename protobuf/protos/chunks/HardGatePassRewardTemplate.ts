import { CMSField } from "../../interfaces/CMSField";

export const HardGatePassRewardTemplate: Map<number, CMSField> = new Map([
  [
    2,
    {
      name: "Template",
      type: "group",
      fields: new Map([[1, { name: "durationMsecs", type: "varint" }]]),
    },
  ],
]);
