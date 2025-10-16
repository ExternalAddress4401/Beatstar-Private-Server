import { CMSField } from "../../interfaces/CMSField";
import { LiveOpsLoadingScreenTemplate } from "../game/com/spaceape/liveopsloadingscreenconfig/LiveOpsLoadingScreenTemplate";

export const liveOpsLoadingScreenConfig: Map<number, CMSField> = new Map([
  [1000, { name: "version", type: "string" }],
  [
    1,
    {
      name: "loadingScreens",
      type: "packed",
      fields: LiveOpsLoadingScreenTemplate,
    },
  ],
]);
