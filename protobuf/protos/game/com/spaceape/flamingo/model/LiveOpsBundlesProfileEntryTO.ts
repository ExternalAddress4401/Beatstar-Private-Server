import { CMSField } from "../../../../../../interfaces/CMSField";

export const LiveOpsProfileBundlesProfileEntryTO: Map<number, CMSField> =
  new Map([
    [1, { name: "uniqueShopId", type: "string" }],
    [2, { name: "startTimeMsecs", type: "varint" }],
    [3, { name: "endTimeMsecs", type: "varint" }],
    [6, { name: "usdReportingCents", type: "varint" }],
  ]);
