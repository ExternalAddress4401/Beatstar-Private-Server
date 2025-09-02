import { CMSField } from "../../interfaces/CMSField";

export const PlayerLiveOpsEventsTO: Map<number, CMSField> = new Map([
  [
    2,
    {
      name: "activeEvents",
      type: "group",
      fields: new Map([
        [
          1,
          {
            name: "playedBeatmaps",
            type: "group",
            fields: new Map([]),
          },
        ],
        [2, { name: "playableBeatmaps_id", type: "varint-repeat" }],
        [5, { name: "nextRefreshTimeMsecs", type: "varint" }],
      ]),
    },
  ],
]);
