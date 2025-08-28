import { CMSField } from "../interfaces/CMSField";

export const proto: Map<number, CMSField> = new Map([
  [1, { name: "version", type: "string" }],
  [2, { name: "service", type: "string" }],
  [3, { name: "rpc", type: "string" }],
  [4, { name: "authenticationTicket", type: "string" }],
  [6, { name: "unknown1", type: "varint" }],
  [7, { name: "unknown2", type: "varint" }],
  [9, { name: "clide", type: "string" }],
]);
