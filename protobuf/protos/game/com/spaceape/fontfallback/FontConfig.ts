import { CMSField } from "../../../../../interfaces/CMSField";

export const FontConfig: Map<number, CMSField> = new Map([
  [2, { name: "preferredFallbackFontsMacOS", type: "string-repeat" }],
  [3, { name: "preferredFallbackFontsWindows", type: "string-repeat" }],
  [4, { name: "preferredFallbackFontsAndroid", type: "string-repeat" }],
  [5, { name: "preferredFallbackFontsiOS", type: "string-repeat" }],
]);
