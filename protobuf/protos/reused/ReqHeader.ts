import { CMSField } from "../../interfaces/CMSField";
import { BatchHeader } from "./BatchHeader";

export const ReqHeader: Map<number, CMSField> = new Map([
  [1, { name: "id", type: "varint" }],
  [2, { name: "clientVersion", type: "string" }],
  [3, { name: "timestamp", type: "varint" }],
  [
    4,
    {
      name: "batchHeader",
      type: "group",
      fields: BatchHeader,
    },
  ],
  [6, { name: "authenticationTicket", type: "string" }],
]);
