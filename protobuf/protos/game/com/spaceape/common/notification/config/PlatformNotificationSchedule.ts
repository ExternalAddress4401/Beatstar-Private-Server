import { CMSField } from "../../../../../../../interfaces/CMSField";
import { SeasonNotificationSchedule } from "../../../config/SeasonNotificationSchedule";

export const PlatformNotificationSchedule: Map<number, CMSField> = new Map([
  [
    1,
    {
      name: "type",
      type: "enum",
      enums: {
        103: SeasonNotificationSchedule,
      },
    },
  ],
  [3, { name: "id", type: "varint" }],
  [4, { name: "idLabel", type: "string" }],
  [5, { name: "maxTimesToShow", type: "varint" }],
  [6, { name: "notificationOptions_id", type: "string-repeat" }],
  [8, { name: "enabled", type: "boolean" }],
]);
