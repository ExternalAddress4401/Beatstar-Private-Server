import { CMSField } from "../../interfaces/CMSField";
import { LiveOpsLeaderboardEventTO } from "./LiveOpsLeaderboardEventTO";
import { LiveOpsSongShuffleEventTO } from "./LiveOpsSongShuffleEventTO";
import { PlayerLiveOpsEventsTO } from "./PlayerLiveOpsEventsTO";

export const LiveOpsTotaliserEventTO: Map<number, CMSField> = new Map([
  [
    1,
    {
      name: "featured",
      type: "packed",
      fields: new Map([
        [
          1,
          {
            name: "type",
            type: "enum",
            enums: {
              2: LiveOpsSongShuffleEventTO,
              3: LiveOpsLeaderboardEventTO,
              4: PlayerLiveOpsEventsTO,
            },
          },
        ],
        [3, { name: "game_id", type: "varint" }],
        [4, { name: "startTimeMsecs", type: "varint" }],
        [5, { name: "endTimeMsecs", type: "varint" }],
      ]),
    },
  ],
  [2, { name: "recentBeatmapRolls_id", type: "varint-repeat" }],
  [3, { name: "lastEndedUtcTimeMsecs", type: "varint" }],
  [4, { name: "lastEndedLocalTimeMsecs", type: "varint" }],
]);
