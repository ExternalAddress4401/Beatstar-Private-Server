import { CMSField } from "../../interfaces/CMSField";

export const GachaBoxRewardTO: Map<number, CMSField> = new Map([
  [
    1,
    {
      name: "GachaBox",
      type: "group",
      fields: new Map([
        [3, { name: "box_id", type: "varint" }],
        [
          5,
          {
            name: "beatmapSelection",
            type: "group",
            fields: new Map([
              [1, { name: "beatmaps_id", type: "varint-repeat" }],
              [4, { name: "seed", type: "varint" }],
              [7, { name: "beatmapPool_id", type: "varint-repeat" }],
            ]),
          },
        ],
      ]),
    },
  ],
]);
