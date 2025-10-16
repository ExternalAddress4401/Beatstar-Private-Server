import { CMSField } from "../../../../../interfaces/CMSField";

export const SongStreakColorTemplate: Map<number, CMSField> = new Map([
  [2, { name: "GlowColor", type: "string" }],
  [3, { name: "PerfectBarColor", type: "string" }],
  [4, { name: "InvertPerfectBar", type: "boolean" }],
  [5, { name: "VFXColor", type: "string" }],
  [10, { name: "WhizzbangColor", type: "varint" }],
  [11, { name: "SpeakerConeColor", type: "varint" }],
  [12, { name: "ScoreColor", type: "varint" }],
  [13, { name: "UIStageColor", type: "varint" }],
]);
