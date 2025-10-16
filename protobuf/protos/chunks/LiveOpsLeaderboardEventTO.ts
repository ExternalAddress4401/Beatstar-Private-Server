import { CMSField } from "../../interfaces/CMSField";

export const LiveOpsLeaderboardEventTO: Map<number, CMSField> = new Map([
  [1, { name: "incompleteAttempts", type: "varint" }],
  [2, { name: "bestScore", type: "group", fields: new Map([]) }],
  [3, { name: "attemptsLeft", type: "varint" }],
  [4, { name: "leaderboardId", type: "string" }],
  [5, { name: "leaderboardEndTimeMsecs", type: "varint" }],
  [6, { name: "endedPosition", type: "varint" }],
  [7, { name: "leaderboardBeatmap_id", type: "varint" }],
  [8, { name: "leaderboardEnded", type: "boolean" }],
  [13, { name: "leaderboardSegmentIndex", type: "varint" }],
  [14, { name: "gachaData", type: "group", fields: new Map([]) }],
  [15, { name: "playerStatus", type: "group", fields: new Map([]) }],
  [
    16,
    {
      name: "extraTurnVideoAdCounterState",
      type: "group",
      fields: new Map([]),
    },
  ],
  [
    17,
    {
      name: "videoAdForTokenCounterState",
      type: "group",
      fields: new Map([]),
    },
  ],
]);
