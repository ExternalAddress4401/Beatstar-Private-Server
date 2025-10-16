import { CMSField } from "../../interfaces/CMSField";

export const PlayerProtoIntersitialsTO: Map<number, CMSField> = new Map([
  [
    1,
    {
      name: "InterstitialStates",
      type: "packed",
      fields: new Map([
        [1, { name: "PromoInterstitial_id", type: "varint" }],
        [2, { name: "ShowCount", type: "varint" }],
        [3, { name: "LastSeenMsecs", type: "varint" }],
      ]),
    },
  ],
]);
