import { CMSField } from "../interfaces/CMSField";
import { ReqPayload } from "./reused/ReqPayload";
import { RespHeader } from "./reused/RespHeader";
import { RespPayload } from "./reused/RespPayload";

export const ExecuteSharplaAuditResp: Map<number, CMSField> = new Map([
  ...RespHeader,
  [
    5,
    {
      name: "requests",
      type: "group",
      fields: new Map([
        ...RespPayload,
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
