import { CMSField } from "../../../../../interfaces/CMSField";
import { FileDetails } from "../config/FileDetails";

export const LiveOpsEmojiSpineTemplate: Map<number, CMSField> = new Map([
  [1, { name: "id", type: "varint" }],
  [5, { name: "idLabel", type: "string" }],
  [6, { name: "Skins", type: "string-repeat" }],
  [
    2,
    {
      name: "SpriteAtlas",
      type: "group",
      fields: FileDetails,
    },
  ],
  [
    3,
    {
      name: "Json",
      type: "group",
      fields: FileDetails,
    },
  ],
  [
    4,
    {
      name: "SpriteAtlasTxt",
      type: "group",
      fields: FileDetails,
    },
  ],
]);
