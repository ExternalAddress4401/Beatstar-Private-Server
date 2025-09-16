import { CMSField } from "../../interfaces/CMSField";

export const SetFtueFlag_SharplaAudit: Map<number, CMSField> = new Map([
  [
    2,
    {
      name: "audit",
      type: "group",
      fields: new Map([
        [1, { name: "Flag_id", type: "varint" }],
        [2, { name: "Value", type: "boolean" }],
      ]),
    },
  ],
]);
