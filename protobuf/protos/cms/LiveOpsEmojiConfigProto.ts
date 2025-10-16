import { CMSField } from "../../interfaces/CMSField";
import { LiveOpsEmojiSettings } from "../game/com/spaceape/liveopsemojiconfig/LiveOpsEmojiSettings";
import { LiveOpsEmojiSpineTemplate } from "../game/com/spaceape/liveopsemojiconfig/LiveOpsEmojiSpineTemplate";
import { LiveOpsEmojiTemplate } from "../game/com/spaceape/liveopsemojiconfig/LiveOpsEmojiTemplate";

export const LiveOpsEmojiConfigProto: Map<number, CMSField> = new Map([
  [
    1,
    {
      name: "LiveOpsEmojis",
      type: "packed",
      fields: LiveOpsEmojiTemplate,
    },
  ],
  [
    2,
    {
      name: "LiveOpsEmojiSpines",
      type: "packed",
      fields: LiveOpsEmojiSpineTemplate,
    },
  ],
  [100, { name: "version", type: "string" }],
  [
    101,
    {
      name: "Settings",
      type: "group",
      fields: LiveOpsEmojiSettings,
    },
  ],
]);
