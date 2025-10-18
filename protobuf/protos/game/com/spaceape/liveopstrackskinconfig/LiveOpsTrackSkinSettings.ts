import { CMSField } from "../../../../../interfaces/CMSField";
import { RequirementTemplate } from "../config/RequirementTemplate";

export const LiveOpsTrackSkinSettings: Map<number, CMSField> = new Map([
  [1, { name: "startingTrackSkins_id", type: "varint-repeat" }],
  [2, { name: "defaultSkin_id", type: "varint" }],
  [3, { name: "defaultPreviewSkin_id", type: "varint" }],
  [4, { name: "genres_id", type: "varint-repeat" }],
  [
    5,
    { name: "unlockRequirement", type: "group", fields: RequirementTemplate },
  ],
  [6, { name: "starMilestoneForUnlock_id", type: "varint" }],
]);
