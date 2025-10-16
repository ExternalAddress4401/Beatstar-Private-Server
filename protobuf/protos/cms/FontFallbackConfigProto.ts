import { CMSField } from "../../interfaces/CMSField";
import { FontConfig } from "../game/com/spaceape/fontfallback/FontConfig";

export const FontFallbackConfigProto: Map<number, CMSField> = new Map([
  [1000, { name: "version", type: "string" }],
  [
    1001,
    {
      name: "fontConfig",
      type: "group",
      fields: FontConfig,
    },
  ],
]);
