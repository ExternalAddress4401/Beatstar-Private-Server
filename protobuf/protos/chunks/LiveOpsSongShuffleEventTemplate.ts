import { CMSField } from "../../interfaces/CMSField";

export const LiveOpsSongShuffleEventTemplate: Map<number, CMSField> = new Map([
  [
    2,
    {
      name: "Event",
      type: "group",
      fields: new Map([
        [1, { name: "numSongs", type: "varint" }],
        [2, { name: "numPlays", type: "varint" }],
        [
          7,
          {
            name: "repeatDurationMsecs",
            type: "varint",
          },
        ],
      ]),
    },
  ],
]);
