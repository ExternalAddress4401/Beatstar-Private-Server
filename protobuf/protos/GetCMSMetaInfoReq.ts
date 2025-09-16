import { CMSField } from "../interfaces/CMSField";

export const GetCMSMetaInfoReq: Map<number, CMSField> = new Map([
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
]);
