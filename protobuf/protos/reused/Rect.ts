import { CMSField } from "../../interfaces/CMSField";

export const Rect: Map<number, CMSField> = new Map([
  [3, { name: "width", type: "varint" }],
  [4, { name: "height", type: "varint" }],
]);
