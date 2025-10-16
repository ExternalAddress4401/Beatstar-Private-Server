import { CMSField } from "../interfaces/CMSField";
import { RespHeader } from "./reused/RespHeader";
import { RespPayload } from "./reused/RespPayload";

export const SubscribeResp: Map<number, CMSField> = new Map([
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
              [1, { name: "historyUntilMsecs", type: "varint" }],
            ]),
          },
        ],
      ]),
    },
  ],
]);
