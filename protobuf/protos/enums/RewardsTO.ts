import { CMSField } from "../../interfaces/CMSField";
import { CurrencyRewardTO } from "../chunks/CurrencyRewardTO";

export const RewardsTO: Map<number, CMSField> = new Map([
  [
    1,
    {
      name: "type",
      type: "enum",
      enums: {
        2: CurrencyRewardTO,
      },
    },
  ],
  [3, { name: "Source", type: "varint" }],
]);
