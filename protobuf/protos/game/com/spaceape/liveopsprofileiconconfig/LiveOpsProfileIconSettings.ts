import { CMSField } from "../../../../../interfaces/CMSField";

export const LiveOpsProfileIconSettings: Map<number, CMSField> = new Map([
  [1, { name: "startingProfileIcons_id", type: "varint-repeat" }],
  [2, { name: "defaultSet_id", type: "varint" }],
  [3, { name: "iconsToDisplayInCollection_id", type: "varint-repeat" }],
]);
