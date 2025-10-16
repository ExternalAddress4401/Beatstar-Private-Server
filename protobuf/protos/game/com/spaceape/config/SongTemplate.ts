import { CMSField } from "../../../../../interfaces/CMSField";
import { WwiseSwitch } from "../apeaudio/WwiseSwitch";
import { GradientTO } from "./GradientTO";
import { SongStreakColorTemplate } from "./SongStreakColorTemplate";
import { SongWeightingScore } from "./SongWeightingScore";

export const SongTemplate: Map<number, CMSField> = new Map([
  [68, { name: "ISRC", type: "string" }],
  [
    69,
    {
      name: "LegalState",
      type: "varint",
      map: {
        0: "Any",
        1: "NotOwned",
        2: "Owned",
      },
    },
  ],
  [1, { name: "id", type: "varint" }],
  [67, { name: "idLabel", type: "string" }],
  [66, { name: "BibleId", type: "string" }],
  [5, { name: "BPM", type: "float" }],
  [74, { name: "SilentBeats", type: "float" }],
  [19, { name: "CoverArtAsset_id", type: "string" }],
  [22, { name: "TimeSignature", type: "varint" }],
  [39, { name: "BaseColor", type: "string" }],
  [40, { name: "DarkColor", type: "string" }],
  [56, { name: "CheckpointOutlineColour", type: "string" }],
  [45, { name: "ColorGradient", type: "group", fields: GradientTO }],
  [60, { name: "ColorGradientInGame", type: "group", fields: GradientTO }],
  [
    61,
    {
      name: "StreakConfig",
      type: "group",
      fields: SongStreakColorTemplate,
    },
  ],
  [62, { name: "TrackIntensityGlow", type: "string" }],
  [63, { name: "VFXColor", type: "string" }],
  [64, { name: "VFXAlternativeColor", type: "string" }],
  [
    53,
    {
      name: "wwiseSwitch",
      type: "group",
      fields: WwiseSwitch,
    },
  ],
  [50, { name: "GenreTagsId", type: "varint-repeat" }],
  [71, { name: "SongContentState", type: "varint" }],
  [76, { name: "SongTitleLocId", type: "string" }],
  [77, { name: "SongArtistLocId", type: "string" }],
  [79, { name: "MusicKitData_id", type: "varint" }],
  [80, { name: "Groups_id", type: "varint-repeat" }],
  [
    7,
    {
      name: "weightingTags",
      type: "packed",
      fields: SongWeightingScore,
    },
  ],
  [83, { name: "RemovalReason", type: "string" }],
  [84, { name: "SongMetaId", type: "varint" }],
  [85, { name: "sku_id", type: "varint" }],
  [86, { name: "audioAsset_id", type: "string" }],
  [87, { name: "artist_id", type: "string" }],
  [65, { name: "AudioBanks_id", type: "string" }],
  [72, { name: "LegalAttribution", type: "string" }],
  [78, { name: "Rejected", type: "boolean" }],
  [90, { name: "TrackGlow", type: "varint" }],
]);
