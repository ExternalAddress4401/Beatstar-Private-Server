import { CMSField } from "../../../../../interfaces/CMSField";
import { StreamableImage } from "../imagestreaming/StreamableImage";

export const LiveOpsLoadingScreenTemplate: Map<number, CMSField> = new Map([
  [1, { name: "id", type: "varint" }],
  [2, { name: "idLabel", type: "string" }],
  [3, { name: "mainImage", type: "group", fields: StreamableImage }],
  [4, { name: "logoTintColor", type: "varint" }],
  [5, { name: "textTintColor", type: "varint" }],
  [6, { name: "timeLimited", type: "boolean" }],
  [7, { name: "startTimeMsecs", type: "varint" }],
  [8, { name: "endTimeMsecs", type: "varint" }],
]);
