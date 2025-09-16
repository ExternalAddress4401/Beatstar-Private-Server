import { CMSField } from "../../interfaces/CMSField";

export const PlatformRequirement: Map<number, CMSField> = new Map([
  [
    2,
    {
      name: "platformRequirement",
      type: "group",
      fields: new Map([[2, { name: "platform", type: "varint" }]]),
    },
  ],
]);
