import { CMSField } from "../../../../../interfaces/CMSField";
import { CmsGradientModifier } from "../../../../reused/CmsGradientModifier";
import { StreamableImage } from "../imagestreaming/StreamableImage";

export const CallingCardTemplate: Map<number, CMSField> = new Map([
  [1, { name: "id", type: "varint" }],
  [2, { name: "name", type: "string" }],
  [8, { name: "idLabel", type: "string" }],
  [9, { name: "showSeasonLevel", type: "boolean" }],
  [10, { name: "visualsPrefab_id", type: "string" }],
  [
    14,
    {
      name: "visualModifiers",
      type: "packed",
      fields: new Map([
        [
          1,
          {
            name: "type",
            type: "enum",
            enums: {
              3: CmsGradientModifier,
            },
          },
        ],
      ]),
    },
  ],
  [15, { name: "set_id", type: "varint" }],
  [16, { name: "streamedImage", type: "group", fields: StreamableImage }],
  [17, { name: "rewardTags_id", type: "varint-repeat" }],
]);
