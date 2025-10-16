import { CMSField } from "../../interfaces/CMSField";
import { LiveOpsProfileIconSettings } from "../game/com/spaceape/liveopsprofileiconconfig/LiveOpsProfileIconSettings";
import { LiveOpsProfileIconTemplate } from "../game/com/spaceape/liveopsprofileiconconfig/LiveOpsProfileIconTemplate";

export const LiveOpsProfileIconConfigProto: Map<number, CMSField> = new Map([
  [
    1,
    {
      name: "LiveOpsProfileIcons",
      type: "packed",
      fields: LiveOpsProfileIconTemplate,
    },
  ],
  [
    5,
    {
      name: "ProfileIconSettings",
      type: "group",
      fields: LiveOpsProfileIconSettings,
    },
  ],
  [100, { name: "version", type: "string" }],
]);
