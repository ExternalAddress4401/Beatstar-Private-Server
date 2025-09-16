import { CMSField } from "../../interfaces/CMSField";

export const PlayerTrackSkinsTO: Map<number, CMSField> = new Map([
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
        [
          2,
          {
            name: "skinsSetToGenres",
            type: "packed",
            fields: new Map([
              [1, { name: "genre_id", type: "varint" }],
              [2, { name: "skin_id", type: "varint" }],
            ]),
          },
        ],
        [3, { name: "globalSkin_id", type: "varint" }],
      ]),
    },
  ],
]);
