import { CMSField } from "../interfaces/CMSField";
import { RespHeader } from "./reused/RespHeader";

export const ExecuteSharplaAuditResp: Map<number, CMSField> = new Map([
  ...RespHeader,
  [
    5,
    {
      name: "requests",
      type: "group",
      fields: new Map([
        [1, { name: "id", type: "varint" }],
        [3, { name: "rpcType", type: "varint" }],
        [
          5,
          {
            name: "body",
            type: "group",
            fields: new Map([
              [1, { name: "id", type: "varint" }],
              [3, { name: "rpcType", type: "varint" }],
              [
                5,
                {
                  name: "requests",
                  type: "group",
                  fields: new Map([]),
                },
              ],
            ]),
          },
        ],
      ]),
    },
  ],
]);
