import { CMSField } from "../interfaces/CMSField";
import { ReqHeader } from "./reused/ReqHeader";
import { ReqPayload } from "./reused/ReqPayload";

export const GetUnclaimedPurchasesReq: Map<number, CMSField> = new Map([
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
            fields: new Map([]),
          },
        ],
      ]),
    },
  ],
  [6, { name: "authenticationTicket", type: "string" }],
]);
