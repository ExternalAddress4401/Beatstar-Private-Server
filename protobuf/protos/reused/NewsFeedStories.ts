import { CMSField } from "../../interfaces/CMSField";
import { StreamableImage } from "../game/com/spaceape/imagestreaming/StreamableImage";

export const NewsFeedStories: Map<number, CMSField> = new Map([
  [1, { name: "type", type: "varint" }],
  [
    2,
    {
      name: "requirements",
      type: "group",
      fields: new Map([
        [1, { name: "content", type: "string" }],
        [
          2,
          {
            name: "requirements",
            type: "string-repeat",
          },
        ],
      ]),
    },
  ],
  [3, { name: "legacyId", type: "varint" }],
  [4, { name: "viewType", type: "string" }],
  [5, { name: "startTimeMsecs", type: "varint" }],
  [6, { name: "endTimeMsecs", type: "varint" }],
  [7, { name: "popup", type: "boolean" }],
  [8, { name: "order", type: "varint" }],
  [
    10,
    {
      name: "image",
      type: "group",
      fields: StreamableImage,
    },
  ],
  [11, { name: "title", type: "string" }],
  [13, { name: "status", type: "varint" }],
  [14, { name: "id", type: "hex-string" }],
]);
