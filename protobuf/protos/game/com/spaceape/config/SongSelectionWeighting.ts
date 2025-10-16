import { CMSField } from "../../../../../interfaces/CMSField";

export const SongSelectionWeighting: Map<number, CMSField> = new Map([
  [1, { name: "id", type: "varint" }],
  [2, { name: "idLabel", type: "string" }],
  [3, { name: "totaliser", type: "varint" }],
  [4, { name: "shuffle", type: "varint" }],
  [5, { name: "easyQueue", type: "varint" }],
  [6, { name: "box", type: "varint" }],
]);
