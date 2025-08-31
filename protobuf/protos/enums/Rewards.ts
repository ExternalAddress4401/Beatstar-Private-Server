import { CMSField } from "../../interfaces/CMSField";
import { BeatmapRewardTemplate } from "../chunks/BeatmapRewardTemplate";
import { CallingCardRewardTemplate } from "../chunks/CallingCardRewardTemplate";
import { CosmeticGachaBoxRewardTemplate } from "../chunks/CosmeticGachaBoxRewardTemplate";
import { CurrencyRewardTemplate } from "../chunks/CurrencyRewardTemplate";
import { EmojiRewardTemplate } from "../chunks/EmojiRewardTemplate";
import { GachaBoxRewardTemplate } from "../chunks/GachaBoxRewardTemplate";
import { HardGatePassRewardTemplate } from "../chunks/HardGatePassRewardTemplate";
import { ProfileIconRewardTemplate } from "../chunks/ProfileIconRewardTemplate";
import { TrackSkinRewardTemplate } from "../chunks/TrackSkinRewardTemplate";

export const Rewards: Map<number, CMSField> = new Map([
  [
    1,
    {
      name: "type",
      type: "enum",
      enums: {
        2: CurrencyRewardTemplate,
        3: ProfileIconRewardTemplate,
        6: BeatmapRewardTemplate,
        8: GachaBoxRewardTemplate,
        11: HardGatePassRewardTemplate,
        13: EmojiRewardTemplate,
        14: CallingCardRewardTemplate,
        19: TrackSkinRewardTemplate,
        20: CosmeticGachaBoxRewardTemplate,
      },
    },
  ],
]);
