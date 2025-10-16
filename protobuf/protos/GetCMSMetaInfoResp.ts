import { CMSField } from "../interfaces/CMSField";
import { RespHeader } from "./reused/RespHeader";
import { RespPayload } from "./reused/RespPayload";

export const GetCMSMetaInfoResp: Map<number, CMSField> = new Map([
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
              [
                1,
                {
                  name: "serverCmsMetaInfos",
                  type: "group",
                  fields: new Map([
                    [1, { name: "type", type: "string" }],
                    [2, { name: "version", type: "string" }],
                    [3, { name: "checksum", type: "string" }],
                    [4, { name: "patchUrl", type: "string" }],
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
