import { CMSField } from "../../interfaces/CMSField";

export const EmojiRewardTemplate: Map<number, CMSField> = new Map([
  [1, { name: "emoji_id", type: "varint" }],
]);
