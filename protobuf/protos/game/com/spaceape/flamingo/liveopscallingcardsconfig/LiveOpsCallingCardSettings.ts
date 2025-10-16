import { CMSField } from "../../../../../../interfaces/CMSField";

export const LiveOpsCallingCardSettings: Map<number, CMSField> = new Map([
  [1, { name: "StartingCallingCards_id", type: "varint-repeat" }],
]);
