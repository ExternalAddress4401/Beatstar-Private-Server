import { CMSField } from "../../interfaces/CMSField";

export const RhythmGameEnded_SharplaAudit: Map<number, CMSField> = new Map([
  [
    2,
    {
      name: "audit",
      type: "group",
      fields: new Map([
        [1, { name: "song_id", type: "varint" }],
        [3, { name: "maxStreak", type: "varint" }],
        [
          5,
          {
            name: "scoreTypeCounts",
            type: "packed",
            fields: new Map([
              [
                1,
                {
                  name: "scoreType",
                  type: "varint",
                  map: {
                    1: "Miss",
                    2: "A",
                    3: "B",
                    4: "C",
                    6: "APLUS",
                  },
                },
              ],
              [2, { name: "count", type: "varint" }],
            ]),
          },
        ],
        [
          8,
          {
            name: "resultType",
            type: "varint",
            map: {
              0: "None",
              1: "Quit",
              2: "Fail",
              3: "TotallyComplete",
            },
          },
        ],
        [
          9,
          {
            name: "interactionTypeAndCountPerStreakMultiplier",
            type: "packed",
            fields: new Map([
              [
                1,
                {
                  name: "InteractionType",
                  type: "varint",
                  map: {
                    0: "Tap",
                    1: "Hold",
                    2: "Flick",
                    3: "HoldFlick",
                    4: "SwitchHold",
                    5: "SwitchHoldFlick",
                  },
                },
              ],
              [2, { name: "CountsPerStreakMultiplier", type: "varint-repeat" }],
              [
                3,
                {
                  name: "ScoreTypeCounts",
                  type: "packed",
                  fields: new Map([
                    [
                      1,
                      {
                        name: "scoreType",
                        type: "varint",
                        map: {
                          1: "Miss",
                          2: "A",
                          3: "B",
                          4: "C",
                          6: "APLUS",
                        },
                      },
                    ],
                    [2, { name: "count", type: "varint" }],
                  ]),
                },
              ],
            ]),
          },
        ],
        [11, { name: "previousBeatmapLeaderboardRank", type: "varint" }],
        [12, { name: "currentBeatmapLeaderboardRank", type: "varint" }],
        [
          13,
          {
            name: "score",
            type: "group",
            fields: new Map([
              [1, { name: "normalizedScore", type: "float" }],
              [2, { name: "absoluteScore", type: "varint" }],
            ]),
          },
        ],
        [15, { name: "currentBeatmapLeaderboardNumEntries", type: "varint" }],
        [
          24,
          {
            name: "associatedLiveOpsEvent_id",
            type: "group",
            fields: new Map([]),
          },
        ],
        [
          25,
          {
            name: "deluxeInteractionScores",
            type: "group",
            fields: new Map([]),
          },
        ],
      ]),
    },
  ],
]);
