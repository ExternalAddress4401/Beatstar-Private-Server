import { CMSField } from "../../interfaces/CMSField";

export const RegisterPlatformTokenEnums: Map<number, CMSField> = new Map([
  [1, { name: "deviceToken", type: "string" }],
  [2, { name: "messageType", type: "varint" }],
  [3, { name: "cinta", type: "string" }],
]);

export const RegisterPlatformToken: Map<number, CMSField> = new Map([
  [
    4,
    {
      name: "body",
      type: "group",
      fields: new Map([
        [1, { name: "deviceToken", type: "string" }],
        [2, { name: "messageType", type: "varint" }],
        [3, { name: "cinta", type: "string" }],
      ]),
    },
  ],
]);
