import { CMSField } from "../../interfaces/CMSField";

export const PlayerProfileIconsTO: Map<number, CMSField> = new Map([
  [
    2,
    {
      name: "icons",
      type: "group",
      fields: new Map([
        [
          1,
          {
            name: "owned_id",
            type: "varint-repeat",
            fields: new Map([]),
          },
        ],
      ]),
    },
  ],
]);
