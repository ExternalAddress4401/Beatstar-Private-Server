import { CMSField } from "../../interfaces/CMSField";
import { BeatmapRewardTemplate } from "../chunks/BeatmapRewardTemplate";
import { CosmeticGachaBoxRewardTemplate } from "../chunks/CosmeticGachaBoxRewardTemplate";
import { CurrencyRewardTemplate } from "../chunks/CurrencyRewardTemplate";
import { GachaBoxRewardTemplate } from "../chunks/GachaBoxRewardTemplate";
import { HardGatePassRewardTemplate } from "../chunks/HardGatePassRewardTemplate";
import { Rewards } from "../enums/Rewards";

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
            name: "Rewards",
            type: "packed",
            fields: Rewards,
          },
        ],
      ]),
    },
  ],
  [8, { name: "claimLinkPopupUrl", type: "string" }],
]);
