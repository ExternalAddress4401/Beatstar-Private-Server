import { CMSField } from "../../interfaces/CMSField";

export const CurrencyRewardTemplate: Map<number, CMSField> = new Map([
  [
    2,
    {
      name: "reward",
      type: "group",
      fields: new Map([
        [1, { name: "Currency_id", type: "varint" }],
        [2, { name: "Amount", type: "varint" }],
      ]),
    },
  ],
]);
