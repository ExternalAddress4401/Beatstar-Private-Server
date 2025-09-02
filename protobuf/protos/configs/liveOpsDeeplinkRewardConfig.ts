import { CMSField } from "../../interfaces/CMSField";
import { LiveOpsDeeplinkRewards } from "../reused/LiveOpsDeepLinkRewards";

export const liveOpsDeeplinkRewardConfig: Map<number, CMSField> = new Map([
  [100, { name: "version", type: "string" }],
  [
    1,
    {
      name: "LiveOpsDeeplinkRewards",
      type: "packed",
      fields: LiveOpsDeeplinkRewards,
    },
  ],
]);
