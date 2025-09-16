import { CMSField } from "../../interfaces/CMSField";
import { Rect } from "./Rect";

export const Image: Map<number, CMSField> = new Map([
  [1, { name: "id", type: "string" }],
  [2, { name: "url", type: "string" }],
  [3, { name: "width", type: "varint" }],
  [4, { name: "height", type: "varint" }],
  [6, { name: "rect", type: "group", fields: Rect }],
]);
