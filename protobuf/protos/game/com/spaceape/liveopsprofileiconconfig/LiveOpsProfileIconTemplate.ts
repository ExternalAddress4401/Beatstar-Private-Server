import { CMSField } from "../../../../../interfaces/CMSField";
import { StreamableImage } from "../imagestreaming/StreamableImage";

export const LiveOpsProfileIconTemplate: Map<number, CMSField> = new Map([
  [1, { name: "id", type: "varint" }],
  [2, { name: "icon", type: "group", fields: StreamableImage }],
  [3, { name: "idLabel", type: "string" }],
  [4, { name: "set_id", type: "varint" }],
  [5, { name: "rewardTags_id", type: "varint-repeat" }],
]);
