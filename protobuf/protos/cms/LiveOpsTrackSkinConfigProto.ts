import { CMSField } from "../../interfaces/CMSField";
import { LiveOpsTrackSkinTemplate } from "../game/com/spaceape/liveopstrackskinconfig/LiveOpsTrackSkinTemplate";

export const LiveOpsTrackSkinConfigProto: Map<number, CMSField> = new Map([
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
