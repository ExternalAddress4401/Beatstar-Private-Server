import { CMSField } from "../../../../../interfaces/CMSField";

export const LiveOpsEmojiSettings: Map<number, CMSField> = new Map([
  [1, { name: "startingEmojis_id", type: "varint-repeat" }],
]);
