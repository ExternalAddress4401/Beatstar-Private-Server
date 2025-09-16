import { CMSField } from "../../interfaces/CMSField";
import { BatchHeader } from "./BatchHeader";

export const RespHeader: Map<number, CMSField> = new Map([
  [1, { name: "id", type: "varint" }],
  [2, { name: "serverTime", type: "varint" }],
  [4, { name: "batchHeader", type: "group", fields: BatchHeader }],
]);
