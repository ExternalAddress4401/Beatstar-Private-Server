import { CMSField } from "../interfaces/CMSField";
import { BatchHeader } from "./reused/BatchHeader";

export const GetCMSMetaInfoResp: Map<number, CMSField> = new Map([
  [1, { name: "id", type: "varint" }],
  [2, { name: "serverTime", type: "varint" }],
  [4, { name: "batchHeader", type: "group", fields: BatchHeader }],
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
              [
                1,
                {
                  name: "serverCmsMetaInfos",
                  type: "group",
                  fields: new Map([
                    [1, { name: "type", type: "string" }],
                    [2, { name: "version", type: "string" }],
                    [3, { name: "checksum", type: "string" }],
                    [5, { name: "contentUrl", type: "string" }],
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
]);
