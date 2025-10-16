import { CMSField } from "../../../../../interfaces/CMSField";
import { LangStrings } from "./LangStrings";

export const Translation: Map<number, CMSField> = new Map([
  [1, { name: "id", type: "string" }],
  [
    2,
    {
      name: "translations",
      type: "group",
      fields: LangStrings,
    },
  ],
  [3, { name: "oldDoNotTranslateForBinaryCompatibility", type: "boolean" }],
  [4, { name: "translationFlags", type: "varint" }],
  [5, { name: "maxCharacters", type: "varint" }],
  [6, { name: "comment", type: "string" }],
  [7, { name: "context", type: "string" }],
]);
