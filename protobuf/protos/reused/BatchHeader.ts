import { CMSField } from "../../interfaces/CMSField";

export const BatchHeader: Map<number, CMSField> = new Map([
  [7, { name: "lastResponseTimestampMsecs", type: "varint" }],
  [9, { name: "profileVersion", type: "varint" }],
]);
