import { CMSField } from "../../../../../interfaces/CMSField";

export const LiveOpsEmojiTemplate: Map<number, CMSField> = new Map([
  [1, { name: "id", type: "varint" }],
  [2, { name: "idLabel", type: "string" }],
  [4, { name: "animation", type: "string" }],
  [5, { name: "set_id", type: "varint" }],
  [8, { name: "emojiSpineTemplate_id", type: "varint" }],
  [9, { name: "rewardTags_id", type: "varint-repeat" }],
]);
