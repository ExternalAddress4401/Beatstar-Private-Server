import { CMSField } from "../../../../../interfaces/CMSField";
import { StreamableImageRect } from "./StreamableImageRect";

export const StreamableImage: Map<number, CMSField> = new Map([
  [1, { name: "id", type: "string" }],
  [2, { name: "url", type: "string" }],
  [3, { name: "width", type: "varint" }],
  [4, { name: "height", type: "varint" }],
  [5, { name: "clickLink", type: "string" }],
  [6, { name: "rect", type: "group", fields: StreamableImageRect }],
]);
