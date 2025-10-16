import { CMSField } from "../../interfaces/CMSField";
import { AudioEvent } from "../game/com/spaceape/apeaudio/AudioEvent";
import { AudioTrigger } from "../game/com/spaceape/apeaudio/AudioTrigger";
import { EQTemplate } from "../game/com/spaceape/apeaudio/EQTemplate";
import { Settings } from "../game/com/spaceape/apeaudio/Settings";

export const AudioConfigProto: Map<number, CMSField> = new Map([
  [100, { name: "version", type: "string" }],
  [
    1001,
    {
      name: "Settings",
      type: "group",
      fields: Settings,
    },
  ],
  [
    109,
    {
      name: "EQEntries",
      type: "packed",
      fields: EQTemplate,
    },
  ],
  [1002, { name: "EventSystem_id", type: "string" }],
  [1003, { name: "GameCanvas_id", type: "string" }],
  [
    1,
    {
      name: "AudioTriggers",
      type: "packed",
      fields: AudioTrigger,
    },
  ],
  [
    2,
    {
      name: "AudioEvents",
      type: "packed",
      fields: AudioEvent,
    },
  ],
]);
