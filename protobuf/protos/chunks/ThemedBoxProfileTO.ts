import { CMSField } from "../../interfaces/CMSField";

export const ThemedBoxProfileTO: Map<number, CMSField> = new Map([
  [
    2,
    {
      name: "themedBox",
      type: "group",
      fields: new Map([
        [1, { name: "cycle", type: "varint" }],
        [2, { name: "Boxes_id", type: "varint-repeat" }],
      ]),
    },
  ],
]);
