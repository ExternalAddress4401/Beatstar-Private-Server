import { CMSField } from "../../../../../interfaces/CMSField";
import { TimedRegionNotification } from "./TimedRegionNotification";

export const SeasonNotificationSchedule: Map<number, CMSField> = new Map([
  [
    1,
    {
      name: "SeasonNotifications",
      type: "group",
      fields: TimedRegionNotification,
    },
  ],
]);
