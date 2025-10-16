import { CMSField } from "../../interfaces/CMSField";
import { Rewards } from "../enums/Rewards";
import { StreamableImage } from "../game/com/spaceape/imagestreaming/StreamableImage";

export const LiveOpsTotaliserEventTemplate: Map<number, CMSField> = new Map([
  [
    10,
    {
      name: "requirement",
      type: "group",
      fields: new Map([
        [3, { name: "requirements", type: "group", fields: new Map([]) }],
      ]),
    },
  ],
  [
    5,
    {
      name: "rewards",
      type: "packed",
      fields: new Map([
        [1, { name: "countRequired", type: "varint" }],
        [2, { name: "reward", type: "group", fields: Rewards }],
        [3, { name: "isMilestone", type: "boolean" }],
      ]),
    },
  ],
  [3, { name: "refreshDurationMsecs", type: "varint" }],
  [11, { name: "tileRimColour", type: "varint" }],
  [13, { name: "boosterShopEnabled", type: "boolean" }],
  [14, { name: "boosterShopPricePoint_id", type: "varint" }],
  [15, { name: "boosterShopRewards", type: "packed", fields: Rewards }],
  [16, { name: "boosterShopMaxPurchases", type: "varint" }],
  [
    17,
    {
      name: "songSelectionCriteria",
      type: "group",
      fields: new Map([
        [3, { name: "genres_id", type: "varint-repeat" }],
        [5, { name: "numSongs", type: "varint" }],
        [6, { name: "selectionGroupSet_id", type: "varint" }],
      ]),
    },
  ],
  [18, { name: "tileIcon", type: "group", fields: StreamableImage }],
  [19, { name: "eventDescriptionTxt", type: "string" }],
  [20, { name: "uiBackgroundImage", type: "group", fields: StreamableImage }],
  [21, { name: "singleSongSwapGemCost", type: "varint" }],
  [22, { name: "refreshAllSongsGemCost", type: "varint" }],
  [23, { name: "startingNotifMsgTxt", type: "string" }],
  [24, { name: "endingNotifMsgTxt", type: "string" }],
]);
