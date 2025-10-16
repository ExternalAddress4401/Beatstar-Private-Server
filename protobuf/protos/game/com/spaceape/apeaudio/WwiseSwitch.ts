import { CMSField } from "../../../../../interfaces/CMSField";

export const WwiseSwitch: Map<number, CMSField> = new Map([
  [1, { name: "switchId", type: "varint" }],
  [2, { name: "switchState", type: "varint" }],
]);
