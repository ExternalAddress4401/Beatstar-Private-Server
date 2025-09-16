import { CMSField } from "../../interfaces/CMSField";

export const LangConfigProto: Map<number, CMSField> = new Map([
  [100, { name: "version", type: "string" }],
  [102, { name: "settings", type: "group", fields: new Map([]) }],
  [106, { name: "unknown1", type: "group", fields: new Map([]) }],
  [107, { name: "unknown2", type: "group", fields: new Map([]) }],
  [
    1,
    {
      name: "translations",
      type: "group",
      fields: new Map([
        [1, { name: "id", type: "string" }],
        [
          2,
          {
            name: "translations",
            type: "group",
            fields: new Map([
              [1, { name: "key", type: "string" }],
              [2, { name: "value", type: "string" }],
            ]),
          },
        ],
      ]),
    },
  ],
  [
    2,
    {
      name: "languages",
      type: "group",
      fields: new Map([
        [1, { name: "id", type: "string" }],
        [2, { name: "nativeName", type: "string" }],
        [3, { name: "enabled", type: "boolean" }],
        [4, { name: "defaultCulture", type: "string" }],
        [5, { name: "exportToTransifex", type: "boolean" }],
        [6, { name: "transifexId", type: "string" }],
      ]),
    },
  ],
]);
