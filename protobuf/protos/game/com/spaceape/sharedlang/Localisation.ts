import { CMSField } from "../../../../../interfaces/CMSField";
import { Translation } from "./Translation";

export const Localisation: Map<number, CMSField> = new Map([
  [1, { name: "sourceLanguage_id", type: "string" }],
  [2, { name: "targetLanguages_id", type: "string-repeat" }],
  [
    3,
    {
      name: "translations",
      type: "group",
      fields: Translation,
    },
  ],
]);
