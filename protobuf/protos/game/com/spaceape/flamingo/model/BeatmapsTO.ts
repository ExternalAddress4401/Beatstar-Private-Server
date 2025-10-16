import { CMSField } from "../../../../../../interfaces/CMSField";

export const BeatmapsTO: Map<number, CMSField> = new Map([
  [1, { name: "template_id", type: "varint" }],
  [15, { name: "HighestStreak", type: "varint" }],
  [7, { name: "HighestCheckpoint", type: "varint" }],
  [
    17,
    {
      name: "BragState",
      type: "group",
      fields: new Map([
        [5, { name: "bragScoreThresholdMin", type: "varint" }],
        [
          2,
          {
            name: "expireTimeMsecs",
            type: "varint",
          },
        ],
        [
          3,
          {
            name: "previousRank",
            type: "varint",
          },
        ],
      ]),
    },
  ],
  [
    18,
    {
      name: "HighestScore",
      type: "group",
      fields: new Map([
        [
          1,
          {
            name: "normalizedScore",
            type: "double",
          },
        ],
        [
          2,
          {
            name: "absoluteScore",
            type: "varint",
          },
        ],
      ]),
    },
  ],
  [19, { name: "PlayedCount", type: "varint" }],
  [20, { name: "RewardSource", type: "varint" }],
  [21, { name: "Version", type: "varint" }],
  [
    22,
    {
      name: "NormalizedLifetimeScore",
      type: "double",
    },
  ],
  [23, { name: "absoluteScore", type: "varint" }],
  [6, { name: "HighestGrade_id", type: "varint" }],
  [
    25,
    {
      name: "UnfinishedPlayCount",
      type: "varint",
    },
  ],
]);
