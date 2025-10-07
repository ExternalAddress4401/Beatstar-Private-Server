import { CMSField } from "../../interfaces/CMSField";
import { Gradient } from "../reused/Gradient";

export const SongConfigProto: Map<number, CMSField> = new Map([
  [1, { name: "version", type: "string" }],
  [
    3,
    {
      name: "GameSKUs",
      type: "packed",
      fields: new Map([
        [1, { name: "id", type: "varint" }],
        [2, { name: "idLabel", type: "string" }],
      ]),
    },
  ],
  [
    4,
    {
      name: "Beatmaps",
      type: "group",
      fields: new Map([
        [1, { name: "id", type: "varint" }],
        [21, { name: "Song_id", type: "varint" }],
        [37, { name: "idLabel", type: "string" }],
        [46, { name: "BeatmapVariantReference_id", type: "varint" }],
        [
          5,
          {
            name: "availability",
            type: "varint",
            map: {
              0: "NotAvailable",
              1: "InCampaign",
              2: "OutsideCampaign",
              3: "Tutorial",
              4: "Calibration",
              5: "ComingSoon",
            },
          },
        ],
      ]),
    },
  ],
  [
    5,
    {
      name: "BeatmapVariants",
      type: "group",
      fields: new Map([
        [1, { name: "id", type: "varint" }],
        [2, { name: "idLabel", type: "string" }],
        [3, { name: "Song_id", type: "varint" }],
        [4, { name: "MaxNumLanes", type: "varint" }],
        [5, { name: "MaxScore", type: "varint" }],
        [6, { name: "Difficulty_id", type: "varint" }],
        [8, { name: "Version", type: "varint" }],
        [9, { name: "isComplete", type: "varint" }],
        [10, { name: "InteractionsReference_id", type: "varint" }],
        [12, { name: "NumStars", type: "varint" }],
        [13, { name: "InteractionsAsset_id", type: "string" }],
        [14, { name: "botScoreCurve", type: "group", fields: new Map([]) }],
        [15, { name: "Description", type: "string" }],
        [16, { name: "BeatmapType", type: "varint" }],
      ]),
    },
  ],
  [
    6,
    {
      name: "Songs",
      type: "group",
      fields: new Map([
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
        [45, { name: "ColorGradient", type: "group", fields: Gradient }],
        [60, { name: "ColorGradientInGame", type: "group", fields: Gradient }],
        [
          61,
          {
            name: "StreakConfig",
            type: "group",
            fields: new Map([
              [2, { name: "GlowColor", type: "string" }],
              [3, { name: "PerfectBarColor", type: "string" }],
              [4, { name: "InvertPerfectBarColor", type: "boolean" }],
              [5, { name: "VFXColor", type: "string" }],
              [10, { name: "WhizzbangColor", type: "signed-varint" }],
              [11, { name: "SpeakerConeColor", type: "signed-varint" }],
              [12, { name: "ScoreColor", type: "signed-varint" }],
              [13, { name: "UIStageColor", type: "signed-varint" }],
            ]),
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
            fields: new Map([
              [1, { name: "switchId", type: "varint" }],
              [2, { name: "switchState", type: "varint" }],
            ]),
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
            fields: new Map([
              [1, { name: "tag_id", type: "varint" }],
              [2, { name: "weight3dp", type: "varint" }],
            ]),
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
      ]),
    },
  ],
  [
    7,
    {
      name: "SongDifficulties",
      type: "packed",
      fields: new Map([
        [1, { name: "id", type: "varint" }],
        [3, { name: "difficulty", type: "varint" }],
        [15, { name: "idLabel", type: "string" }],
      ]),
    },
  ],
  [
    8,
    {
      name: "SongTags",
      type: "packed",
      fields: new Map([
        [1, { name: "id", type: "varint" }],
        [14, { name: "idLabel", type: "string" }],
        [21, { name: "sku_id", type: "varint" }],
      ]),
    },
  ],
  [
    10,
    {
      name: "SongWeightingTags",
      type: "packed",
      fields: new Map([
        [1, { name: "id", type: "varint" }],
        [2, { name: "idLabel", type: "string" }],
      ]),
    },
  ],
  [
    11,
    {
      name: "BanGroups",
      type: "packed",
      fields: new Map([
        [1, { name: "id", type: "string" }],
        [4, { name: "blanketBanned", type: "boolean" }],
        [6, { name: "removalType", type: "varint" }],
        [7, { name: "hideCoverArt", type: "boolean" }],
      ]),
    },
  ],
  [
    12,
    {
      name: "SongGroups",
      type: "packed",
      fields: new Map([
        [1, { name: "id", type: "varint" }],
        [2, { name: "idLabel", type: "string" }],
      ]),
    },
  ],
  [
    13,
    {
      name: "SongMetas",
      type: "packed",
      fields: new Map([
        [1, { name: "id", type: "varint" }],
        [2, { name: "idLabel", type: "string" }],
      ]),
    },
  ],
  [
    14,
    {
      name: "SongArtists",
      type: "packed",
      fields: new Map([
        [1, { name: "id", type: "string" }],
        [2, { name: "trivia_id", type: "string-repeat" }],
        [3, { name: "albumArtSuitableForLoadingScreen", type: "boolean" }],
      ]),
    },
  ],
  [
    15,
    {
      name: "SongSelectionWeightings",
      type: "packed",
      fields: new Map([
        [1, { name: "id", type: "varint" }],
        [2, { name: "idLabel", type: "string" }],
        [3, { name: "totaliser", type: "varint" }],
        [4, { name: "shuffle", type: "varint" }],
        [5, { name: "easyQueue", type: "varint" }],
        [6, { name: "box", type: "varint" }],
      ]),
    },
  ],
]);
