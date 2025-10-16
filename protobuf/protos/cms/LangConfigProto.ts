import { CMSField } from "../../interfaces/CMSField";
import { BakedLang } from "../game/com/spaceape/sharedlang/BakedLang";
import { LangSettings } from "../game/com/spaceape/sharedlang/LangSettings";
import { LanguageConfig } from "../game/com/spaceape/sharedlang/LanguageConfig";
import { Translation } from "../game/com/spaceape/sharedlang/Translation";

export const LangConfigProto: Map<number, CMSField> = new Map([
  [100, { name: "version", type: "string" }],
  [101, { name: "selectedLanguage_id", type: "string" }],
  [102, { name: "settings", type: "group", fields: LangSettings }],
  [103, { name: "minimumClientVersion", type: "string" }],
  [104, { name: "maximumClientVersion", type: "string" }],
  [105, { name: "bakeSettings", type: "group", fields: BakedLang }],
  [106, { name: "unknown1", type: "group", fields: new Map([]) }],
  [107, { name: "unknown2", type: "group", fields: new Map([]) }],
  [
    1,
    {
      name: "translations",
      type: "group",
      fields: Translation,
    },
  ],
  [
    2,
    {
      name: "languages",
      type: "group",
      fields: LanguageConfig,
    },
  ],
]);
