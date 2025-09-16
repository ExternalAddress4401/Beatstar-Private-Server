import { CMSField } from "../interfaces/CMSField";

export const SendAnalyticEventResp: Map<number, CMSField> = new Map([
  [1, { name: "type", type: "varint" }],
  [2, { name: "a", type: "group", fields: new Map([]) }],
]);
