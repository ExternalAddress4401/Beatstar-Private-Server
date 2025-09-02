import { CMSField } from "../../interfaces/CMSField";
import { LiveOpsLeaderboardEventTemplate } from "../chunks/LiveOpsLeaderboardEventTemplate";
import { LiveOpsSongShuffleEventTemplate } from "../chunks/LiveOpsSongShuffleEventTemplate";
import { LiveOpsTotaliserEventTemplate } from "../chunks/LiveOpsTotaliserEventTemplate";

export const liveOpsEventConfig: Map<number, CMSField> = new Map([
  [100, { name: "version", type: "string" }],
  [
    3,
    {
      name: "LiveOpsEvents",
      type: "packed",
      fields: new Map([
        [
          1,
          {
            name: "type",
            type: "enum",
            enums: {
              2: LiveOpsSongShuffleEventTemplate,
              3: LiveOpsLeaderboardEventTemplate,
              4: LiveOpsTotaliserEventTemplate,
            },
          },
        ],
        [3, { name: "id", type: "varint" }],
        [4, { name: "idLabel", type: "string" }],
        [7, { name: "startTimeMsecs", type: "varint" }],
        [8, { name: "endTimeMsecs", type: "varint" }],
        [9, { name: "useLocalTime", type: "boolean" }],
        [5, { name: "nameTxt", type: "string" }],
        [12, { name: "developmentState", type: "varint" }],
        [13, { name: "template", type: "string" }],
      ]),
    },
  ],
]);
