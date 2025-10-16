import { CMSField } from "../../interfaces/CMSField";

export const CurrencyRewardTO: Map<number, CMSField> = new Map([
  [
    1,
    {
      name: "Currency",
      type: "group",
      fields: new Map([
        [1, { name: "currency_id", type: "varint" }],
        [2, { name: "amount", type: "varint" }],
      ]),
    },
  ],
]);
