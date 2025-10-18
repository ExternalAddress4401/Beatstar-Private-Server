import { CMSField } from "../../interfaces/CMSField";

export const NotificationConfigProto: Map<number, CMSField> = new Map([
  [1000, { name: "version", type: "string" }],
  [1001, { name: "jitterMsecs", type: "varint" }],
  [
    1,
    {
      name: "Notifications",
      type: "raw",
    },
  ],
  [2, { name: "Channels", type: "raw" }],
  [3, { name: "Schedules", type: "raw" }],
  [1002, { name: "abTest", type: "string" }],
  [1003, { name: "defaultIcon", type: "string" }],
  [1004, { name: "disablePush", type: "boolean" }],
]);

/*export const NotificationConfigProto: Map<number, CMSField> = new Map([
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
]);*/
