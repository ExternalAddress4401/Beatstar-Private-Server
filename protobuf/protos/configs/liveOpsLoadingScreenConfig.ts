import { CMSField } from "../../interfaces/CMSField";
import { Image } from "../reused/Image";

export const liveOpsLoadingScreenConfig: Map<number, CMSField> = new Map([
  [1000, { name: "version", type: "string" }],
  [
    1,
    {
      name: "loadingScreens",
      type: "packed",
      fields: new Map([
        [1, { name: "id", type: "varint" }],
        [2, { name: "idLabel", type: "string" }],
        [
          3,
          {
            name: "mainImage",
            type: "group",
            fields: Image,
          },
        ],
        [4, { name: "logoTintColor", type: "signed-varint" }],
        [5, { name: "testTintColor", type: "signed-varint" }],
        [6, { name: "timeLimited", type: "boolean" }],
        [7, { name: "startTimeMsecs", type: "varint" }],
        [8, { name: "endTimeMsecs", type: "varint" }],
      ]),
    },
  ],
]);
