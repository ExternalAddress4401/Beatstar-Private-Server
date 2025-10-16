import { CMSField } from "../../../../../interfaces/CMSField";

export const LanguageConfig: Map<number, CMSField> = new Map([
  [1, { name: "id", type: "string" }],
  [2, { name: "nativeName", type: "string" }],
  [3, { name: "enabled", type: "boolean" }],
  [4, { name: "defaultCulture", type: "string" }],
  [5, { name: "exportToTransifex", type: "boolean" }],
  [6, { name: "transifexId", type: "string" }],
]);
