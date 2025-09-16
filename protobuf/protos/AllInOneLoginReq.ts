import { CMSField } from "../interfaces/CMSField";

export const AllInOneLoginReq: Map<number, CMSField> = new Map([
  [1, { name: "id", type: "varint" }],
  [2, { name: "type", type: "varint" }],
  [7, { name: "version", type: "string" }],
  [11, { name: "timestamp", type: "varint" }],
  [
    112,
    {
      name: "reqAllInOneLogin",
      type: "group",
      fields: new Map([[3, { name: "cinta", type: "string" }]]),
    },
  ],
]);
