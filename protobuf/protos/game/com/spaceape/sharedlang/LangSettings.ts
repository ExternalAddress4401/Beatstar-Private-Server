import { CMSField } from "../../../../../interfaces/CMSField";
import { LangStrings } from "./LangStrings";

export const LangSettings: Map<number, CMSField> = new Map([
  [2, { name: "bakedTexts_id", type: "string-repeat" }],
  [5, { name: "translations", type: "group", fields: LangStrings }],
  [6, { name: "bakeFromAwsAccountName", type: "string" }],
  [7, { name: "bakeFromEnvironment", type: "string" }],
]);
