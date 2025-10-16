import { CMSField } from "../interfaces/CMSField";
import { ReqHeader } from "./reused/ReqHeader";
import { ReqPayload } from "./reused/ReqPayload";

export const SubscribeReqEnums: Map<number, CMSField> = new Map([
  [1, { name: "clide", type: "string" }],
  [2, { name: "topicId", type: "string" }],
  [3, { name: "historyFromMsecs", type: "varint" }],
  [4, { name: "maxHistorySize", type: "varint" }],
]);

export const SubscribeReq: Map<number, CMSField> = new Map([
  ...ReqHeader,
  [
    5,
    {
      name: "requests",
      type: "group",
      fields: new Map([
        ...ReqPayload,
        [
          4,
          {
            name: "body",
            type: "group",
            fields: new Map([
              [1, { name: "clide", type: "string" }],
              [2, { name: "topicId", type: "string" }],
              [3, { name: "historyFromMsecs", type: "varint" }],
              [4, { name: "maxHistorySize", type: "varint" }],
            ]),
          },
        ],
      ]),
    },
  ],
  [6, { name: "authenticationTicket", type: "string" }],
]);
