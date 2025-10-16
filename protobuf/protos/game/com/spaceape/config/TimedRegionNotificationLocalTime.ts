import { CMSField } from "../../../../../interfaces/CMSField";

export const TimedRegionNotificationLocalTime: Map<number, CMSField> = new Map([
  [1, { name: "LocalTimeMsecs", type: "varint" }],
  [2, { name: "PlusDaysFromRegionTime", type: "varint" }],
]);
