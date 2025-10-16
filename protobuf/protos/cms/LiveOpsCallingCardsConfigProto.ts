import { CMSField } from "../../interfaces/CMSField";
import { CallingCardTemplate } from "../game/com/spaceape/config/CallingCardTemplate";
import { LiveOpsCallingCardSettings } from "../game/com/spaceape/flamingo/liveopscallingcardsconfig/LiveOpsCallingCardSettings";

export const LiveOpsCallingCardsConfigProto: Map<number, CMSField> = new Map([
  [1, { name: "version", type: "string" }],
  [
    4,
    {
      name: "CallingCards",
      type: "packed",
      fields: CallingCardTemplate,
    },
  ],
  [
    5,
    {
      name: "CallingCardSettings",
      type: "group",
      fields: LiveOpsCallingCardSettings,
    },
  ],
]);
