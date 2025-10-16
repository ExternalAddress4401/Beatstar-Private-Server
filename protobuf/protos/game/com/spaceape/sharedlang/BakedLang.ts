import { CMSField } from "../../../../../interfaces/CMSField";

export const BakedLang: Map<number, CMSField> = new Map([
  [1, { name: "Environment", type: "string" }],
  [2, { name: "Baked_id", type: "string-repeat" }],
]);
