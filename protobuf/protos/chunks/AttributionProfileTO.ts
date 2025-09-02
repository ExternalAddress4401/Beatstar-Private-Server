import { CMSField } from "../../interfaces/CMSField";

export const AttributionProfileTO: Map<number, CMSField> = new Map([
  [
    2,
    {
      name: "attribution",
      type: "group",
      fields: new Map([[1, { name: "campaign", type: "string" }]]),
    },
  ],
]);
