import { CMSField } from "../../interfaces/CMSField";
import { PlatformNotificationChannel } from "../game/com/spaceape/common/notification/config/PlatformNotificationChannel";
import { PlatformNotificationSchedule } from "../game/com/spaceape/common/notification/config/PlatformNotificationSchedule";
import { PlatformNotificationTemplate } from "../game/com/spaceape/common/notification/config/PlatformNotificationTemplate";

export const NotificationConfigProto: Map<number, CMSField> = new Map([
  [
    1,
    {
      name: "Notifications",
      type: "packed",
      fields: PlatformNotificationTemplate,
    },
  ],
  [
    2,
    { name: "Channels", type: "packed", fields: PlatformNotificationChannel },
  ],
  [
    3,
    { name: "Schedules", type: "packed", fields: PlatformNotificationSchedule },
  ],
  [1000, { name: "version", type: "string" }],
  [1001, { name: "jitterMsecs", type: "varint" }],
  [1002, { name: "abTest", type: "string" }],
  [1003, { name: "defaultIcon", type: "string" }],
  [1004, { name: "disablePush", type: "boolean" }],
]);
