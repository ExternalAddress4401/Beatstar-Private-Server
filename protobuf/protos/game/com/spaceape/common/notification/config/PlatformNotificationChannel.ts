import { CMSField } from "../../../../../../../interfaces/CMSField";

export const PlatformNotificationChannel: Map<number, CMSField> = new Map([
  [1, { name: "id", type: "string" }],
  [2, { name: "idLabel", type: "string" }],
  [3, { name: "title_id", type: "string" }],
  [4, { name: "sound", type: "string" }],
  [5, { name: "vibration", type: "boolean" }],
  [6, { name: "light", type: "boolean" }],
  [7, { name: "requestPermissionsTip_id", type: "string" }],
  [8, { name: "cooldownInMinutes", type: "varint" }],
  [9, { name: "requestPermissionsTipTitle_id", type: "string" }],
  [10, { name: "requestPermissionsTipTitleOk_id", type: "string" }],
  [11, { name: "requestPermissionsTipTitleCancel_id", type: "string" }],
  [12, { name: "requestSettingsTitle_id", type: "string" }],
  [13, { name: "requestSettingsBody_id", type: "string" }],
  [14, { name: "requestSettingsOk_id", type: "string" }],
  [15, { name: "requestSettingsCancel_id", type: "string" }],
]);
