import { CMSField } from "../../../../../../../interfaces/CMSField";

export const PlatformNotificationTemplate: Map<number, CMSField> = new Map([
  [3, { name: "id", type: "string" }],
  [4, { name: "view", type: "string" }],
  [5, { name: "title_id", type: "string" }],
  [6, { name: "body_id", type: "string" }],
  [9, { name: "channel_id", type: "string" }],
  [12, { name: "icon", type: "string" }],
  [13, { name: "bigIcon", type: "string" }],
  [14, { name: "iosBody_id", type: "string" }],
  [15, { name: "customImage", type: "string" }],
  [16, { name: "abTest", type: "string" }],
  [17, { name: "bigPicture", type: "string" }],
]);
