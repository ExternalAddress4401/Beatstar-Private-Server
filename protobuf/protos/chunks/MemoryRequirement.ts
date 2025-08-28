import { CMSField } from "../../interfaces/CMSField";

export const MemoryRequirement: Map<number, CMSField> = new Map([
  [
    2,
    {
      name: "memoryRequirement",
      type: "group",
      fields: new Map([
        [1, { name: "minimumSystemMemoryMb", type: "varint" }],
        [2, { name: "minimumGpuMemoryMb", type: "varint" }],
      ]),
    },
  ],
]);
