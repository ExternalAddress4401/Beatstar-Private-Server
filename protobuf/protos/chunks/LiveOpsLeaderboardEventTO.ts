import { CMSField } from "../../interfaces/CMSField";

export const LiveOpsLeaderboardEventTO: Map<number, CMSField> = new Map([
  [
    2,
    {
      name: "test",
      type: "group",
      fields: new Map([
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
      ]),
    },
  ],
]);
