import { CMSField } from "../../interfaces/CMSField";
import { Rewards } from "../enums/Rewards";
import { StreamableImage } from "../game/com/spaceape/imagestreaming/StreamableImage";

export const LiveOpsLeaderboardEventTemplate: Map<number, CMSField> = new Map([
  [
    1,
    {
      name: "segments",
      type: "packed",
      fields: new Map([
        [
          1,
          {
            name: "beatmaps",
            type: "packed",
            fields: new Map([
              [1, { name: "beatmap_id", type: "varint" }],
              [2, { name: "buyCost", type: "varint" }],
            ]),
          },
        ],
      ]),
    },
  ],
  [2, { name: "playActiveDurationMsecs", type: "varint" }],
  [3, { name: "numPlayers", type: "varint" }],
  [12, { name: "numAiPlayers", type: "varint" }],
  [4, { name: "numAttempts", type: "varint" }],
  [
    15,
    {
      name: "spinTicketCost",
      type: "group",
      fields: new Map([
        [1, { name: "currency_id", type: "varint" }],
        [2, { name: "amount", type: "varint" }],
      ]),
    },
  ],
  [13, { name: "initialTickets", type: "varint" }],
  [
    6,
    {
      name: "gachaRewards",
      type: "group",
      fields: new Map([
        [3, { name: "uniqueRewardEveryN", type: "varint" }],
        [
          4,
          {
            name: "uniqueTier",
            type: "group",
            fields: new Map([
              [1, { name: "weight", type: "varint" }],
              [
                2,
                {
                  name: "rewards",
                  type: "packed",
                  fields: Rewards,
                },
              ],
            ]),
          },
        ],
        [
          5,
          {
            name: "repeatableTiers",
            type: "packed",
            fields: new Map([
              [1, { name: "weight", type: "varint" }],
              [
                2,
                {
                  name: "rewards",
                  type: "packed",
                  fields: Rewards,
                },
              ],
              [
                3,
                {
                  name: "fallbackReward",
                  type: "group",
                  fields: Rewards,
                },
              ],
            ]),
          },
        ],
        [6, { name: "displayRandomSeed", type: "varint" }],
      ]),
    },
  ],
  [
    7,
    {
      name: "rewardTiers",
      type: "packed",
      fields: new Map([
        [1, { name: "position", type: "varint" }],
        [2, { name: "count", type: "varint" }],
      ]),
    },
  ],
  [10, { name: "eventEndedCooloffDurationMsecs", type: "varint" }],
  [11, { name: "datesDetailsTxt", type: "string" }],
  [16, { name: "bannerImage", type: "group", fields: StreamableImage }],
  [
    17,
    {
      name: "bannerGradient",
      type: "group",
      fields: new Map([
        //idiots using a different Gradient type
        [
          2,
          {
            name: "alphaKeys",
            type: "packed",
            fields: new Map([
              [1, { name: "alpha", type: "float" }],
              [2, { name: "time", type: "float" }],
            ]),
          },
        ],
        [
          3,
          {
            name: "colorKeys",
            type: "packed",
            fields: new Map([
              [1, { name: "color", type: "varint" }],
              [2, { name: "time", type: "float" }],
            ]),
          },
        ],
      ]),
    },
  ],
  [19, { name: "eventFlavourTxt", type: "string" }],
  [21, { name: "localNoti_laterSegmentsMsgTxt", type: "string" }],
  [27, { name: "shopEnabled", type: "boolean" }],
  [24, { name: "shopPricePoint_id", type: "varint" }],
  [25, { name: "shopMaxPurchases", type: "varint" }],
  [
    26,
    {
      name: "shopRewards",
      type: "packed",
      fields: Rewards,
    },
  ],
  [28, { name: "playlistBundleGemCost", type: "varint" }],
]);
