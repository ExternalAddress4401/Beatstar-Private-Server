import { CMSField } from "../../../../../interfaces/CMSField";

export const StreamableImageRect: Map<number, CMSField> = new Map([
  [1, { name: "x", type: "varint" }],
  [2, { name: "y", type: "varint" }],
  [3, { name: "width", type: "varint" }],
  [4, { name: "height", type: "varint" }],
]);
