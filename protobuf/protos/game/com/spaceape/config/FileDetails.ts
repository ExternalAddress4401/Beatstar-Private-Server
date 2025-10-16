import { CMSField } from "../../../../../interfaces/CMSField";

export const FileDetails: Map<number, CMSField> = new Map([
  [2, { name: "url", type: "string" }],
  [4, { name: "crc", type: "varint" }],
  [5, { name: "id", type: "string" }],
]);
