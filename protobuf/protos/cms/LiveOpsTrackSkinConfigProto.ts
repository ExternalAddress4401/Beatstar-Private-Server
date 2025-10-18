import { CMSField } from "../../interfaces/CMSField";
import { LiveOpsTrackSkinSettings } from "../game/com/spaceape/liveopstrackskinconfig/LiveOpsTrackSkinSettings";
import { LiveOpsTrackSkinTemplate } from "../game/com/spaceape/liveopstrackskinconfig/LiveOpsTrackSkinTemplate";

export const LiveOpsTrackSkinConfigProto: Map<number, CMSField> = new Map([
  [
    5,
    {
      name: "TrackSkinSettings",
      type: "group",
      fields: LiveOpsTrackSkinSettings,
    },
  ],
  [
    1,
    {
      name: "LiveOpsTrackSkins",
      type: "packed",
      fields: LiveOpsTrackSkinTemplate,
    },
  ],
  [100, { name: "version", type: "string" }],
]);
