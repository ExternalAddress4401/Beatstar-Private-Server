import { CMSField } from "../../interfaces/CMSField";
import { Rewards } from "../enums/Rewards";
import { StreamableImage } from "../game/com/spaceape/imagestreaming/StreamableImage";

export const liveOpsSeasonConfig: Map<number, CMSField> = new Map([
  [1, { name: "version", type: "string" }],
  [
    3,
    {
      name: "Seasons",
      type: "packed",
      fields: new Map([
        [1, { name: "id", type: "varint" }],
        [2, { name: "idLabel", type: "string" }],
        [3, { name: "name", type: "string" }],
        [4, { name: "seasonNumber", type: "varint" }],
        [5, { name: "startTimeMsecs", type: "varint" }],
        [6, { name: "endTimeMsecs", type: "varint" }],
        [9, { name: "beatmaps_id", type: "varint-repeat" }],
        [
          10,
          {
            name: "premiumPassPricePoint_id",
            type: "varint",
          },
        ],
        [
          11,
          {
            name: "headerImage",
            type: "group",
            fields: StreamableImage,
          },
        ],
        [
          12,
          {
            name: "panelMotifImage",
            type: "group",
            fields: StreamableImage,
          },
        ],
        [
          16,
          {
            name: "levels",
            type: "packed",
            fields: new Map([
              [1, { name: "migratedID", type: "varint" }],
              [4, { name: "pointsRequired", type: "varint" }],
              [
                5,
                {
                  name: "freeReward",
                  type: "group",
                  fields: Rewards,
                },
              ],
              [
                6,
                {
                  name: "premiumReward",
                  type: "group",
                  fields: Rewards,
                },
              ],
              [
                7,
                {
                  name: "freeRewardIsInteresting",
                  type: "boolean",
                },
              ],
              [
                8,
                {
                  name: "premiumRewardIsInteresting",
                  type: "boolean",
                },
              ],
            ]),
          },
        ],
        [17, { name: "enabled", type: "boolean" }],
        [18, { name: "firstBonusLevel", type: "varint" }],
        [21, { name: "developmentState", type: "varint" }],
        [22, { name: "songsRequired", type: "varint" }],
        [
          23,
          {
            name: "allowCosmeticFreeRewards",
            type: "boolean",
          },
        ],
        [
          24,
          {
            name: "genericRewards",
            type: "group",
            fields: Rewards,
          },
        ],
      ]),
    },
  ],
]);
