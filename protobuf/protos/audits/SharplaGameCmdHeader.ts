import { CMSField } from "../../interfaces/CMSField";

export const SharplaGameCmdHeader: Map<number, CMSField> = new Map([
  [
    2,
    {
      name: "header",
      type: "group",
      fields: new Map([
        [1, { name: "hardCurrency", type: "varint" }],
        [2, { name: "softCurrency", type: "varint" }],
        [6, { name: "randomSeeds", type: "varint" }],
        [7, { name: "numSongs", type: "varint" }],
        [
          8,
          {
            name: "lastUnlockedSong_id",
            type: "varint",
          },
        ],
        [9, { name: "totalSongScore", type: "varint" }],
      ]),
    },
  ],
]);
