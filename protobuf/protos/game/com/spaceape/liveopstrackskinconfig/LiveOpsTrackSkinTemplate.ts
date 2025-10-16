import { CMSField } from "../../../../../interfaces/CMSField";
import { CompactGradientTO } from "../../../../TO/CompactGradientTO";
import { SongStreakColorTemplate } from "../config/SongStreakColorTemplate";
import { StreamableImage } from "../imagestreaming/StreamableImage";
import { Localisation } from "../sharedlang/Localisation";
import { LiveOpsTrackSkinExtensionTemplate } from "./LiveOpsTrackSkinExtensionTemplate";

export const LiveOpsTrackSkinTemplate: Map<number, CMSField> = new Map([
  [1, { name: "id", type: "varint" }],
  [2, { name: "idLabel", type: "string" }],
  [3, { name: "laneTexture_id", type: "string" }],
  [4, { name: "laneImage", type: "group", fields: StreamableImage }],
  [5, { name: "tapZoneTexture_id", type: "string" }],
  [6, { name: "tapZoneImage", type: "group", fields: StreamableImage }],
  [7, { name: "perfectLineTexture_id", type: "string" }],
  [8, { name: "perfectLineImage", type: "group", fields: StreamableImage }],
  [9, { name: "topBgTexture_id", type: "string" }],
  [10, { name: "topBgImage", type: "group", fields: StreamableImage }],
  [11, { name: "showSongAlbumArt", type: "boolean" }],
  [
    13,
    {
      name: "backgroundDefaultGradient",
      type: "group",
      fields: CompactGradientTO,
    },
  ],
  [14, { name: "laneWrapMode", type: "varint" }],
  [
    15,
    {
      name: "backgroundStreakGradient",
      type: "group",
      fields: CompactGradientTO,
    },
  ],
  [16, { name: "laneTextureOffset", type: "float" }],
  [17, { name: "laneTextureScale", type: "float" }],
  [18, { name: "perfectTxtColor", type: "varint" }],
  [19, { name: "trackEqDefaultColor", type: "varint" }],
  [20, { name: "trackEqStreakColor", type: "varint" }],
  [21, { name: "topEqDefaultColor", type: "varint" }],
  [22, { name: "topEqStreakColor", type: "varint" }],
  [23, { name: "bottomBgTexture_id", type: "string" }],
  [24, { name: "bottomBgImage", type: "group", fields: StreamableImage }],
  [25, { name: "perfectIndentTexture_id", type: "string" }],
  [26, { name: "perfectIndexImage", type: "group", fields: StreamableImage }],
  [27, { name: "topCircleTexture_id", type: "string" }],
  [28, { name: "topCircleImage", type: "group", fields: StreamableImage }],
  [29, { name: "topBgAlignsToCircle", type: "boolean" }],
  [30, { name: "topBgCircleAlignOffset", type: "float" }],
  [32, { name: "vfxColor", type: "varint" }],
  [33, { name: "genreLimits_id", type: "varint-repeat" }],
  [
    34,
    {
      name: "StreakConfig",
      type: "packed",
      fields: SongStreakColorTemplate,
    },
  ],
  [35, { name: "IconTexture_id", type: "string" }],
  [36, { name: "IconImage", type: "group", fields: StreamableImage }],
  [38, { name: "perfectBarTintable", type: "boolean" }],
  [39, { name: "rewardTags_id", type: "varint-repeat" }],
  [40, { name: "name", type: "string" }],
  [41, { name: "topCircleScaleX", type: "float" }],
  [42, { name: "topCircleScaleY", type: "float" }],
  [43, { name: "perfectIndentTintColor", type: "varint" }],
  [
    44,
    {
      name: "localisation",
      type: "group",
      fields: Localisation,
    },
  ],
  [45, { name: "trackIntensityGlowColor", type: "varint" }],
  [46, { name: "skinSet_id", type: "varint" }],
  [
    999,
    {
      name: "extensions",
      type: "group",
      fields: LiveOpsTrackSkinExtensionTemplate,
    },
  ],
]);
