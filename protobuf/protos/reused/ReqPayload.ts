import { CMSField } from "../../interfaces/CMSField";

export const ReqPayload: Map<number, CMSField> = new Map([
  [1, { name: "id", type: "varint" }],
  [2, { name: "header", type: "group", fields: new Map([]) }],
  [3, { name: "rpcType", type: "varint" }],
]);
