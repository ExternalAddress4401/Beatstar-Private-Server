import { CMSField } from "../../../../../interfaces/CMSField";

export const UnityAssetPatch: Map<number, CMSField> = new Map([
  [1, { name: "id", type: "string" }],
  [2, { name: "name", type: "string" }],
  [3, { name: "iosBundle", type: "string" }],
  [4, { name: "androidBundle", type: "string" }],
]);
