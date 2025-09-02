import { CMSField } from "../interfaces/CMSField";
import { FeaturedSongProfileTO } from "./chunks/FeaturedSongProfileTO";
import { LiveOpsTotaliserEventTO } from "./chunks/LiveOpsTotaliserEventTO";
import { LiveOpsBundlesProfileTO } from "./chunks/LiveOpsBundlesProfileTO";
import { ThemedBoxProfileTO } from "./chunks/ThemedBoxProfileTO";
import { liveOpsBundleConfig } from "./configs/liveOpsBundleConfig";
import { liveOpsDeeplinkRewardConfig } from "./configs/liveOpsDeeplinkRewardConfig";
import { liveOpsEventConfig } from "./configs/liveOpsEventConfig";
import { liveOpsLoadingScreenConfig } from "./configs/liveOpsLoadingScreenConfig";
import { liveOpsSeasonConfig } from "./configs/liveOpsSeasonConfig";
import { newsFeedConfig } from "./configs/newsFeedConfig";
import { AttributionProfileTO } from "./chunks/AttributionProfileTO";
import { CampaignSongsProfileTO } from "./chunks/CampaignSongsProfileTO";
import { IapTO } from "./chunks/IapTO";
import { PlayerProfileIconsTO } from "./chunks/PlayerProfileIconsTO";
import { PlayerTrackSkinsTO } from "./chunks/PlayerTrackSkinsTO";
import { PlayerProtoIntersitialsTO } from "./chunks/PlayerPromoIntersitialsTO";
import { ReactivationBundlesHistoryTO } from "./chunks/ReactivationBundlesHistoryTO";
import { PurchasingProfileTO } from "./chunks/PurchasingProfileTO";
import { GachaBoxRewardTO } from "./chunks/GachaBoxRewardTO";
import { BeatmapTO } from "./TO/BeatmapTO";
import { RewardsTO } from "./enums/RewardsTO";

export const SyncResp: Map<number, CMSField> = new Map([
  [1, { name: "id", type: "varint" }],
  [2, { name: "serverTime", type: "varint" }],
  [4, { name: "batchHeader", type: "group", fields: new Map([]) }],
  [
    5,
    {
      name: "body",
      type: "group",
      fields: new Map([
        [1, { name: "id", type: "varint" }],
        [3, { name: "rpcType", type: "varint" }],
        [
          5,
          {
            name: "profile",
            type: "group",
            fields: new Map([
              [
                7,
                {
                  name: "test",
                  type: "group",
                  fields: new Map([
                    [4, { name: "name", type: "string" }],
                    [
                      11,
                      {
                        name: "beatmaps",
                        type: "group",
                        fields: new Map([
                          [
                            1,
                            {
                              name: "beatmaps",
                              type: "packed",
                              fields: BeatmapTO,
                            },
                          ],
                          [
                            2,
                            {
                              name: "removedBeatmaps",
                              type: "packed",
                              fields: BeatmapTO,
                            },
                          ],
                          [
                            6,
                            { name: "selectedFtueBeatmap_id", type: "varint" },
                          ],
                          [7, { name: "totalPlayedCount", type: "varint" }],
                          [8, { name: "totalStartedCount", type: "varint" }],
                          [
                            9,
                            {
                              name: "recentlyChosenBeatmaps_id",
                              type: "varint-repeat",
                            },
                          ],
                        ]),
                      },
                    ],
                    [
                      25,
                      {
                        name: "currencies",
                        type: "packed",
                        fields: new Map([
                          [1, { name: "currency_id", type: "varint" }],
                          [2, { name: "amount", type: "varint" }],
                        ]),
                      },
                    ],
                    [
                      36,
                      {
                        name: "frontEndState",
                        type: "group",
                        fields: new Map([
                          [4, { name: "showLeaderboard", type: "boolean" }],
                          [
                            6,
                            {
                              name: "shop",
                              type: "group",
                              fields: new Map([]),
                            },
                          ],
                          [9, { name: "selectedBeatmap_id", type: "varint" }],
                          [10, { name: "resumePoint", type: "varint" }],
                          [
                            13,
                            {
                              name: "lastSongSelectionSourceType",
                              type: "varint",
                            },
                          ],
                        ]),
                      },
                    ],

                    [48, { name: "numGoldDiscBoxesOpened", type: "varint" }],
                    [
                      52,
                      {
                        name: "scoreTracker",
                        type: "group",
                        fields: new Map([]),
                      },
                    ],
                    [55, { name: "version", type: "varint" }],
                    [
                      58,
                      {
                        name: "session",
                        type: "group",
                        fields: new Map([
                          [1, { name: "appVersion", type: "string" }],
                          [2, { name: "environment", type: "string" }],
                          [3, { name: "country", type: "string" }],
                        ]),
                      },
                    ],
                    [
                      59,
                      {
                        name: "roosters",
                        type: "group",
                        fields: new Map([
                          [1, { name: "queryStrings", type: "string-repeat" }],
                          [
                            2,
                            {
                              name: "dates",
                              type: "packed",
                              fields: new Map([
                                [1, { name: "key", type: "varint" }],
                                [2, { name: "timeMsecs", type: "varint" }],
                              ]),
                            },
                          ],
                          [
                            3,
                            {
                              name: "stringdates",
                              type: "packed",
                              fields: new Map([
                                [1, { name: "key", type: "string" }],
                                [2, { name: "dateMsecs", type: "varint" }],
                              ]),
                            },
                          ],
                        ]),
                      },
                    ],
                    [
                      60,
                      {
                        name: "randoms",
                        type: "group",
                        fields: new Map([
                          [2, { name: "songSelectorSeed", type: "varint" }],
                          [3, { name: "questScoreSeed", type: "varint" }],
                          [5, { name: "gachaSeed", type: "varint" }],
                          [6, { name: "shopSeed", type: "varint" }],
                        ]),
                      },
                    ],
                    [
                      61,
                      {
                        name: "sharplaData",
                        type: "group",
                        fields: new Map([
                          [1, { name: "clide", type: "string" }],
                          [2, { name: "creationTimeMsecs", type: "varint" }],
                          [3, { name: "version", type: "varint" }],
                          [4, { name: "sessionGuid", type: "string" }],
                          [5, { name: "sessionCount", type: "varint" }],
                          [
                            6,
                            { name: "sessionStartedTimeMsecs", type: "varint" },
                          ],
                          [7, { name: "lastSavedTimeMsecs", type: "varint" }],
                          [
                            8,
                            {
                              name: "offsetFromUTCMsecs",
                              type: "signed-varint",
                            },
                          ],
                          [9, { name: "platform", type: "varint" }],
                          [
                            10,
                            {
                              name: "lastSessionStartTimeMsecs",
                              type: "varint",
                            },
                          ],
                          [
                            11,
                            {
                              name: "lastSessionLastSavedTimeMsecs",
                              type: "varint",
                            },
                          ],
                          [12, { name: "saveCount", type: "varint" }],
                          [13, { name: "clientVersion", type: "string" }],
                          [14, { name: "appId", type: "string" }],
                          [15, { name: "installId", type: "string" }],
                        ]),
                      },
                    ],
                    [
                      63,
                      {
                        name: "recordBoxOpening",
                        type: "group",
                        fields: new Map([
                          [
                            7,
                            {
                              name: "nextGachaBox",
                              type: "group",
                              fields: new Map([
                                [3, { name: "box_id", type: "varint" }],
                              ]),
                            },
                          ],
                          [
                            12,
                            {
                              name: "previouslyOpenedGachaBoxes_id",
                              type: "varint-repeat",
                            },
                          ],
                        ]),
                      },
                    ],
                    [
                      64,
                      {
                        name: "transactions",
                        type: "group",
                        fields: new Map([
                          [2, { name: "lastUid", type: "varint" }],
                        ]),
                      },
                    ],
                    [65, { name: "nameUid", type: "varint" }],
                    [
                      5,
                      { name: "basicInfo", type: "group", fields: new Map([]) },
                    ],
                    [
                      66,
                      {
                        name: "friendBrags",
                        type: "group",
                        fields: new Map([]),
                      },
                    ],
                    [
                      68,
                      {
                        name: "shopItems",
                        type: "group",
                        fields: new Map([
                          [
                            1,
                            {
                              name: "shopItems",
                              type: "packed",
                              fields: new Map([
                                [1, { name: "Template_id", type: "varint" }],
                                [
                                  3,
                                  {
                                    name: "PreCalculatedRewards",
                                    type: "group",
                                    fields: new Map([
                                      [
                                        1,
                                        {
                                          name: "Rewards",
                                          type: "packed",
                                          fields: RewardsTO,
                                        },
                                      ],
                                    ]),
                                  },
                                ],
                              ]),
                            },
                          ],
                        ]),
                      },
                    ],
                    [
                      69,
                      {
                        name: "ftueFlags",
                        type: "group",
                        fields: new Map([
                          [1, { name: "Flags_id", type: "varint-repeat" }],
                        ]),
                      },
                    ],

                    [
                      70,
                      {
                        name: "ftueCounters",
                        type: "group",
                        fields: new Map([
                          [
                            1,
                            {
                              name: "Counters",
                              type: "packed",
                              fields: new Map([
                                [1, { name: "Counter_id", type: "varint" }],
                                [2, { name: "Value", type: "varint" }],
                              ]),
                            },
                          ],
                        ]),
                      },
                    ],
                    [
                      72,
                      {
                        name: "campaignGachaBoxSlots",
                        type: "group",
                        fields: new Map([
                          [
                            1,
                            {
                              name: "slots",
                              type: "packed",
                              fields: new Map([
                                [1, { name: "template_id", type: "varint" }],
                                [
                                  2,
                                  {
                                    name: "gachaBox",
                                    type: "group",
                                    fields: new Map([
                                      [3, { name: "box_id", type: "varint" }],
                                    ]),
                                  },
                                ],
                                [3, { name: "currentAmount", type: "varint" }],
                                [4, { name: "requiredAmount", type: "varint" }],
                              ]),
                            },
                          ],
                          [
                            2,
                            {
                              name: "nextGachaBoxForSlot",
                              type: "group",
                              fields: new Map([
                                [3, { name: "box_id", type: "varint" }],
                              ]),
                            },
                          ],
                          [3, { name: "numBoxesAllocated", type: "varint" }],
                        ]),
                      },
                    ],
                    [
                      73,
                      { name: "debugData", type: "group", fields: new Map([]) },
                    ],
                    [
                      74,
                      {
                        name: "likedBeatmaps",
                        type: "group",
                        fields: new Map([
                          [
                            1,
                            {
                              name: "likedBeatmaps_id",
                              type: "varint-repeat",
                            },
                          ],
                        ]),
                      },
                    ],
                    [
                      75,
                      {
                        name: "starMilestoneData",
                        type: "group",
                        fields: new Map([
                          [
                            1,
                            {
                              name: "claimedMilestones_id",
                              type: "varint-repeat",
                            },
                          ],
                          [2, { name: "currentVenue_id", type: "varint" }],
                          [
                            3,
                            { name: "venueReachedTimeMsecs", type: "varint" },
                          ],
                        ]),
                      },
                    ],
                    [
                      76,
                      {
                        name: "starMilestoneGachaBoxesData",
                        type: "group",
                        fields: new Map([]),
                      },
                    ],
                    [
                      77,
                      {
                        name: "cases",
                        type: "group",
                        fields: new Map([
                          [
                            1,
                            {
                              name: "cards",
                              type: "packed",
                              fields: new Map([
                                [
                                  1,
                                  { name: "caseTemplate_id", type: "varint" },
                                ],
                                [2, { name: "count", type: "varint" }],
                              ]),
                            },
                          ],
                          [
                            2,
                            {
                              name: "countRequiredToOpenCase",
                              type: "packed",
                              fields: new Map([
                                [
                                  1,
                                  { name: "caseTemplate_id", type: "varint" },
                                ],
                                [2, { name: "count", type: "varint" }],
                              ]),
                            },
                          ],
                          [3, { name: "numCasesOpened", type: "varint" }],
                        ]),
                      },
                    ],
                    [
                      78,
                      { name: "iapState", type: "group", fields: new Map([]) },
                    ],
                    [
                      79,
                      {
                        name: "grades",
                        type: "group",
                        fields: new Map([
                          [
                            1,
                            {
                              name: "highestGrades",
                              type: "packed",
                              fields: new Map([
                                [1, { name: "grade_id", type: "varint" }],
                                [2, { name: "count", type: "varint" }],
                              ]),
                            },
                          ],
                        ]),
                      },
                    ],
                    [
                      80,
                      {
                        name: "videoAds",
                        type: "group",
                        fields: new Map([
                          [2, { name: "BonusCardsState", type: "varint" }],
                          [
                            3,
                            {
                              name: "TimeOfBonusCardsStateChangeMsecs",
                              type: "varint",
                            },
                          ],
                          [
                            7,
                            {
                              name: "VideoAdInProgress",
                              type: "group",
                              fields: new Map([
                                [1, { name: "WatchType", type: "varint" }],
                              ]),
                            },
                          ],
                          [
                            10,
                            {
                              name: "TimeOfLastBonusCardsStateUseCountResetMsecs",
                              type: "varint",
                            },
                          ],
                          [
                            11,
                            {
                              name: "ResultsAdIntervalState",
                              type: "group",
                              fields: new Map([
                                [1, { name: "State", type: "varint" }],
                                [2, { name: "Count", type: "varint" }],
                                [
                                  3,
                                  {
                                    name: "CooldownResetTimeMsecs",
                                    type: "varint",
                                  },
                                ],
                              ]),
                            },
                          ],
                          [
                            13,
                            {
                              name: "continueGameplayAdIntervalState",
                              type: "group",
                              fields: new Map([]),
                            },
                          ],
                          [
                            15,
                            {
                              name: "CampaignBoxSpeedupAdIntervalState",
                              type: "group",
                              fields: new Map([]),
                            },
                          ],
                          [
                            12,
                            {
                              name: "ActiveVideoAdsProfile_id",
                              type: "string",
                            },
                          ],
                          [
                            13,
                            {
                              name: "ContinueGameplayAdIntervalState",
                              type: "group",
                              fields: new Map([]),
                            },
                          ],

                          [
                            16,
                            {
                              name: "StartSongAdIntervalState",
                              type: "group",
                              fields: new Map([]),
                            },
                          ],
                          [
                            18,
                            {
                              name: "AdsWatchedAndOfferedOverPeriod",
                              type: "packed",
                              fields: new Map([
                                [
                                  1,
                                  {
                                    name: "numberOfAdsOffered",
                                    type: "varint",
                                  },
                                ],
                                [
                                  2,
                                  {
                                    name: "numberOfAdsWatched",
                                    type: "varint",
                                  },
                                ],
                                [
                                  3,
                                  {
                                    name: "numberOfInterstitialAdsWatched",
                                    type: "varint",
                                  },
                                ],
                                [
                                  4,
                                  {
                                    name: "numberOfRewardedAdsWatched",
                                    type: "varint",
                                  },
                                ],
                              ]),
                            },
                          ],
                          [
                            19,
                            { name: "LastAdOfferedTimeMsecs", type: "varint" },
                          ],
                          [20, { name: "AgeProvidedState", type: "varint" }],
                          [
                            22,
                            {
                              name: "NumberOfInterstitialAdsWatchedTotal",
                              type: "varint",
                            },
                          ],
                        ]),
                      },
                    ],
                    [
                      82,
                      {
                        name: "location",
                        type: "group",
                        fields: new Map([
                          [
                            1,
                            {
                              name: "activeLocalisedCampaignData",
                              type: "group",
                              fields: new Map([
                                [1, { name: "baseLocation", type: "string" }],
                                [2, { name: "activeLocation", type: "string" }],
                                [
                                  3,
                                  {
                                    name: "localisedCampaign_id",
                                    type: "string",
                                  },
                                ],
                              ]),
                            },
                          ],
                        ]),
                      },
                    ],
                    [
                      83,
                      { name: "musicKit", type: "group", fields: new Map([]) },
                    ],
                    [
                      84,
                      {
                        name: "deepLinkRewards",
                        type: "group",
                        fields: new Map([
                          [7, { name: "debugViewerType", type: "varint" }],
                        ]),
                      },
                    ],
                    [
                      85,
                      {
                        name: "freeSongChoicePromos",
                        type: "group",
                        fields: new Map([
                          [
                            1,
                            { name: "claimedPromos_id", type: "varint-repeat" },
                          ],
                        ]),
                      },
                    ],
                    [
                      86,
                      {
                        name: "hardGates",
                        type: "group",
                        fields: new Map([
                          [
                            6,
                            { name: "hardGatePassExpiryMsecs", type: "varint" },
                          ],
                        ]),
                      },
                    ],
                    [87, { name: "zendeskUserToken", type: "string" }],
                    [
                      89,
                      {
                        name: "seasons",
                        type: "group",
                        fields: new Map([
                          [1, { name: "season_id", type: "varint" }],
                        ]),
                      },
                    ],
                    [
                      90,
                      {
                        name: "Settings",
                        type: "group",
                        fields: new Map([
                          [
                            2,
                            {
                              name: "startingEmojis_id",
                              type: "varint-repeat",
                              fields: new Map(),
                            },
                          ],
                        ]),
                      },
                    ],
                    [
                      91,
                      {
                        name: "CallingCardSettings",
                        type: "group",
                        fields: new Map([
                          [
                            1,
                            {
                              name: "StartingCallingCards",
                              type: "packed",
                              fields: new Map([
                                [
                                  1,
                                  {
                                    name: "StartingCallingCards_id",
                                    type: "varint",
                                  },
                                ],
                              ]),
                            },
                          ],
                        ]),
                      },
                    ],
                    [
                      92,
                      {
                        name: "playerVisuals",
                        type: "group",
                        fields: new Map([
                          [
                            1,
                            {
                              name: "callingCard",
                              type: "group",
                              fields: new Map([
                                [1, { name: "template_id", type: "varint" }],
                              ]),
                            },
                          ],
                          [2, { name: "profileIcon_id", type: "varint" }],
                        ]),
                      },
                    ],
                    [
                      95,
                      {
                        name: "subProfileTOs",
                        type: "packed",
                        fields: new Map([
                          [
                            1,
                            {
                              name: "type",
                              type: "enum",
                              enums: {
                                2: ThemedBoxProfileTO,
                                3: PurchasingProfileTO,
                                4: LiveOpsBundlesProfileTO,
                                5: FeaturedSongProfileTO,
                                6: AttributionProfileTO,
                                7: LiveOpsTotaliserEventTO,
                                8: ReactivationBundlesHistoryTO,
                                9: CampaignSongsProfileTO,
                                10: IapTO,
                                11: PlayerTrackSkinsTO,
                                12: PlayerProfileIconsTO,
                                13: PlayerProtoIntersitialsTO,
                              },
                            },
                          ],
                        ]),
                      },
                    ],
                    [
                      96,
                      {
                        name: "playerCustomizations",
                        type: "group",
                        fields: new Map([]),
                      },
                    ],
                    [
                      97,
                      {
                        name: "adTotaliser",
                        type: "group",
                        fields: new Map([
                          [
                            2,
                            { name: "totaliserStartTimeMsecs", type: "varint" },
                          ],
                          [
                            3,
                            { name: "totaliserEndTimeMsecs", type: "varint" },
                          ],
                          [
                            6,
                            {
                              name: "activeVideoAdsProfileId",
                              type: "string",
                            },
                          ],
                          [
                            8,
                            {
                              name: "currentTotaliserRewards",
                              type: "packed",
                              fields: new Map([
                                [1, { name: "countRequired", type: "varint" }],
                                [
                                  2,
                                  {
                                    name: "reward",
                                    type: "group",
                                    fields: new Map([
                                      [
                                        1,
                                        {
                                          name: "type",
                                          type: "enum",
                                          enums: {
                                            7: GachaBoxRewardTO,
                                          },
                                        },
                                      ],
                                      [3, { name: "Source", type: "varint" }],
                                    ]),
                                  },
                                ],
                              ]),
                            },
                          ],
                          [
                            9,
                            {
                              name: "lastAdViewTimeMsecs",
                              type: "signed-varint",
                            },
                          ],
                        ]),
                      },
                    ],
                    [
                      98,
                      {
                        name: "playerNameChangeInfo",
                        type: "group",
                        fields: new Map([]),
                      },
                    ],
                  ]),
                },
              ],
              [9, { name: "playerHubStatus", type: "varint" }],
              [
                10,
                {
                  name: "newsFeedConfig",
                  type: "group",
                  fields: newsFeedConfig,
                },
              ],
              [
                11,
                {
                  name: "liveOpsBundleConfig",
                  type: "group",
                  fields: liveOpsBundleConfig,
                },
              ],
              [
                12,
                {
                  name: "liveOpsDeeplinkRewardConfig",
                  type: "group",
                  fields: liveOpsDeeplinkRewardConfig,
                },
              ],
              [
                13,
                {
                  name: "liveOpsEventConfig",
                  type: "group",
                  fields: liveOpsEventConfig,
                },
              ],
              [
                14,
                {
                  name: "liveOpsSeasonConfig",
                  type: "group",
                  fields: liveOpsSeasonConfig,
                },
              ],

              [
                15,
                {
                  name: "liveOpsLoadingScreenConfig",
                  type: "group",
                  fields: liveOpsLoadingScreenConfig,
                },
              ],
            ]),
          },
        ],
      ]),
    },
  ],
]);
