import { CMSField } from "../interfaces/CMSField";

export const proto: Map<number, CMSField> = new Map([
  [1, { name: "id", type: "varint" }],
  [2, { name: "type", type: "varint" }],
  [3, { name: "status", type: "varint" }],
  [10, { name: "clide", type: "string" }],
  [
    112,
    {
      name: "respAllInOneLogin",
      type: "group",
      fields: new Map([
        [1, { name: "authenticationTicket", type: "string" }],
        [2, { name: "clide", type: "string" }],
        [3, { name: "expiryTime", type: "varint" }],
        [4, { name: "cinta", type: "string" }],
      ]),
    },
  ],
]);
