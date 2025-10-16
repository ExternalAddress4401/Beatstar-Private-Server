import { CMSField } from "../../interfaces/CMSField";
import { BeatmapTemplate } from "../game/com/spaceape/config/BeatmapTemplate";
import { BeatmapVariant } from "../game/com/spaceape/config/BeatmapVariant";
import { GameSKU } from "../game/com/spaceape/config/GameSKU";
import { SongArtistTemplate } from "../game/com/spaceape/config/SongArtistTemplate";
import { SongBanGroup } from "../game/com/spaceape/config/SongBanGroup";
import { SongDifficulty } from "../game/com/spaceape/config/SongDifficulty";
import { SongGroup } from "../game/com/spaceape/config/SongGroup";
import { SongMetaTemplate } from "../game/com/spaceape/config/SongMetaTemplate";
import { SongSelectionWeighting } from "../game/com/spaceape/config/SongSelectionWeighting";
import { SongTag } from "../game/com/spaceape/config/SongTag";
import { SongTemplate } from "../game/com/spaceape/config/SongTemplate";
import { SongWeightingTag } from "../game/com/spaceape/config/SongWeightingTag";

export const SongConfigProto: Map<number, CMSField> = new Map([
  [1, { name: "version", type: "string" }],
  [
    3,
    {
      name: "GameSKUs",
      type: "packed",
      fields: GameSKU,
    },
  ],
  [
    4,
    {
      name: "Beatmaps",
      type: "group",
      fields: BeatmapTemplate,
    },
  ],
  [
    5,
    {
      name: "BeatmapVariants",
      type: "group",
      fields: BeatmapVariant,
    },
  ],
  [
    6,
    {
      name: "Songs",
      type: "group",
      fields: SongTemplate,
    },
  ],
  [
    7,
    {
      name: "SongDifficulties",
      type: "packed",
      fields: SongDifficulty,
    },
  ],
  [
    8,
    {
      name: "SongTags",
      type: "packed",
      fields: SongTag,
    },
  ],
  [
    10,
    {
      name: "SongWeightingTags",
      type: "packed",
      fields: SongWeightingTag,
    },
  ],
  [
    11,
    {
      name: "BanGroups",
      type: "packed",
      fields: SongBanGroup,
    },
  ],
  [
    12,
    {
      name: "SongGroups",
      type: "packed",
      fields: SongGroup,
    },
  ],
  [
    13,
    {
      name: "SongMetas",
      type: "packed",
      fields: SongMetaTemplate,
    },
  ],
  [
    14,
    {
      name: "SongArtists",
      type: "packed",
      fields: SongArtistTemplate,
    },
  ],
  [
    15,
    {
      name: "SongSelectionWeightings",
      type: "packed",
      fields: SongSelectionWeighting,
    },
  ],
]);
