import { CMSField } from "../../../../../interfaces/CMSField";
import { TimedRegionNotificationLocalTime } from "./TimedRegionNotificationLocalTime";

export const TimedRegionNotification: Map<number, CMSField> = new Map([
  [1, { name: "UseStartOrEndTime", type: "varint" }],
  [2, { name: "TimeOffsetMsecs", type: "varint" }],
  [3, { name: "NotificationTimeOffsetMsecs", type: "varint" }],
  [4, { name: "DontQueueIfPastEndTime", type: "varint" }],
  [
    5,
    {
      name: "UseLocalTimeOptions",
      type: "group",
      fields: TimedRegionNotificationLocalTime,
    },
  ],
  [6, { name: "NotificationTimeStaggedMsecs", type: "varint" }],
  [7, { name: "NotificationToTrigger_id", type: "string" }],
]);
