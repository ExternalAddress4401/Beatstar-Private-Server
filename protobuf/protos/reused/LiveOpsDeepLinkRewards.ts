import { CMSField } from "../../interfaces/CMSField";
import { BeatmapRewardTemplate } from "../chunks/BeatmapRewardTemplate";
import { CosmeticGachaBoxRewardTemplate } from "../chunks/CosmeticGachaBoxRewardTemplate";
import { CurrencyRewardTemplate } from "../chunks/CurrencyRewardTemplate";
import { GachaBoxRewardTemplate } from "../chunks/GachaBoxRewardTemplate";
import { HardGatePassRewardTemplate } from "../chunks/HardGatePassRewardTemplate";

export const LiveOpsDeeplinkRewards: Map<number, CMSField> = new Map([
  [1, { name: "id", type: "string" }],
  [2, { name: "idLabel", type: "string" }],
  [3, { name: "viewerStatus", type: "varint" }],
  [5, { name: "startTimeMsecs", type: "varint" }],
  [6, { name: "endTimeMsecs", type: "varint" }],
  [
    7,
    {
      name: "rewards",
      type: "group",
      fields: new Map([
        [
          1,
          {
            name: "test",
            type: "packed",
            fields: new Map([
              [
                1,
                {
                  name: "type",
                  type: "enum",
                  enums: {
                    2: CurrencyRewardTemplate,
                    6: BeatmapRewardTemplate,
                    8: GachaBoxRewardTemplate,
                    11: HardGatePassRewardTemplate,
                    20: CosmeticGachaBoxRewardTemplate,
                  },
                },
              ],
            ]),
          },
        ],
      ]),
    },
  ],
  [8, { name: "claimLinkPopupUrl", type: "string" }],
]);
