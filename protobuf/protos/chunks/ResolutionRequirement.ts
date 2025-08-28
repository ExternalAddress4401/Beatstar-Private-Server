import { CMSField } from "../../interfaces/CMSField";

export const ResolutionRequirement: Map<number, CMSField> = new Map([
  [
    2,
    {
      name: "resolutionRequirement",
      type: "group",
      fields: new Map([
        [1, { name: "minimumWidth", type: "varint" }],
        [2, { name: "minimumHeight", type: "varint" }],
      ]),
    },
  ],
]);
