import { CMSField } from "../../interfaces/CMSField";

export const RespPayload: Map<number, CMSField> = new Map([
  [1, { name: "id", type: "varint" }],
  [2, { name: "header", type: "group", fields: new Map([]) }],
  [3, { name: "rpcType", type: "varint" }],
  [
    4,
    {
      name: "error",
      type: "group",
      fields: new Map([
        [1, { name: "code", type: "varint" }],
        [2, { name: "message", type: "string" }],
        [3, { name: "tokenId", type: "string" }],
        [4, { name: "name", type: "string" }],
      ]),
    },
  ],
]);
