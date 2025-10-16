import { CMSField } from "../../../../../interfaces/CMSField";

export const GradientTO: Map<number, CMSField> = new Map([
  [
    2,
    {
      name: "AlphaKeys",
      type: "packed",
      fields: new Map([
        [1, { name: "Alpha", type: "float" }],
        [2, { name: "Time", type: "float" }],
      ]),
    },
  ],
  [
    3,
    {
      name: "ColorKeys",
      type: "packed",
      fields: new Map([
        [1, { name: "Color", type: "string" }],
        [2, { name: "Time", type: "float" }],
      ]),
    },
  ],
]);
