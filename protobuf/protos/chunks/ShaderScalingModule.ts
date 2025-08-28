import { CMSField } from "../../interfaces/CMSField";

export const ShaderScalingModule: Map<number, CMSField> = new Map([
  [
    2,
    {
      name: "scaling",
      type: "group",
      fields: new Map([
        [1, { name: "LOD", type: "varint" }],
        [4, { name: "MaxLights", type: "varint" }],
      ]),
    },
  ],
]);
