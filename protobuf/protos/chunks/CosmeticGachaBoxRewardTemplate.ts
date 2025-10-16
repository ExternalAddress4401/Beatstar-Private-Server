import { CMSField } from "../../interfaces/CMSField";

export const CosmeticGachaBoxRewardTemplate: Map<number, CMSField> = new Map([
  [1, { name: "banners_id", type: "varint-repeat" }],
  [3, { name: "trackSkins_id", type: "varint-repeat" }],
  [4, { name: "profileIcons_id", type: "varint-repeat" }],
  [6, { name: "rewardTags_id", type: "varint-repeat" }],
]);
