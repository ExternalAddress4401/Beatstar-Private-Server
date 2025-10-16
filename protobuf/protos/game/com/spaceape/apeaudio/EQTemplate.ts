import { CMSField } from "../../../../../interfaces/CMSField";

export const EQTemplate: Map<number, CMSField> = new Map([
  [1, { name: "id", type: "varint" }],
  [2, { name: "order", type: "varint" }],
  [
    3,
    {
      name: "rtpc",
      type: "group",
      fields: new Map([[1, { name: "rtpcId", type: "varint" }]]),
    },
  ],
  [4, { name: "amountOfEQ", type: "float" }],
  [5, { name: "idLabel", type: "string" }],
]);
