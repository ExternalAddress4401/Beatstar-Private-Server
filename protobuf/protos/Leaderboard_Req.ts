import { CMSField } from "../interfaces/CMSField";
import { ReqHeader } from "./reused/ReqHeader";
import { ReqPayload } from "./reused/ReqPayload";

export const Leaderboard_ReqEnums: Map<number, CMSField> = new Map([
  [1, { name: "leaderboardName", type: "string" }],
  [2, { name: "friendsOnly", type: "boolean" }],
  [4, { name: "count", type: "varint" }],
]);

export const Leaderboard_Req: Map<number, CMSField> = new Map([
  ...ReqHeader,
  [
    5,
    {
      name: "requests",
      type: "group",
      fields: new Map([
        ...ReqPayload,
        [
          4,
          {
            name: "body",
            type: "group",
            fields: new Map([
              [1, { name: "leaderboardName", type: "string" }],
              [2, { name: "friendsOnly", type: "boolean" }],
              [4, { name: "count", type: "varint" }],
            ]),
          },
        ],
      ]),
    },
  ],
]);
