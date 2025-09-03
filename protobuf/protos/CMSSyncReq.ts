import { CMSField } from "../interfaces/CMSField";

export const CMSSyncReq: Map<number, CMSField> = new Map([
  [1, { name: "id", type: "varint" }],
  [2, { name: "clientVersion", type: "string" }],
  [3, { name: "timestamp", type: "varint" }],
  [4, { name: "batchHeader", type: "group", fields: new Map([]) }],
  [
    5,
    {
      name: "requests",
      type: "group",
      fields: new Map([
        [1, { name: "id", type: "varint" }],
        [2, { name: "header", type: "group", fields: new Map([]) }],
        [3, { name: "rpcType", type: "varint" }],
        [
          4,
          {
            name: "body",
            type: "group",
            fields: new Map([
              [
                1,
                {
                  name: "clientCmsMetaInfos",
                  type: "group",
                  fields: new Map([
                    [1, { name: "type", type: "string" }],
                    [2, { name: "version", type: "string" }],
                    [3, { name: "checksum", type: "string" }],
                    [7, { name: "variant", type: "string" }],
                  ]),
                },
              ],
            ]),
          },
        ],
      ]),
    },
  ],
  [6, { name: "authenticationTicket", type: "string" }],
]);
