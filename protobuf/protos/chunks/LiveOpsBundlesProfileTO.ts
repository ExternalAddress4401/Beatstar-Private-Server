import { CMSField } from "../../interfaces/CMSField";
import { LiveOpsProfileBundlesProfileEntryTO } from "../game/com/spaceape/flamingo/model/LiveOpsBundlesProfileEntryTO";

export const LiveOpsBundlesProfileTO: Map<number, CMSField> = new Map([
  [
    3,
    {
      name: "trackedLiveOpsBundles",
      type: "packed",
      fields: LiveOpsProfileBundlesProfileEntryTO,
    },
  ],
]);
