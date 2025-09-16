import { CMSField } from "../../interfaces/CMSField";
import { ReqHeader } from "./ReqHeader";
import { ReqPayload } from "./ReqPayload";

export const PartialReq: Map<number, CMSField> = new Map([
  ...ReqHeader,
  [
    5,
    {
      name: "requests",
      type: "group",
      fields: new Map([...ReqPayload]),
    },
  ],
]);
