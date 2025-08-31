import { CMSField } from "../interfaces/CMSField";
import { LiveOpsLeaderboardEventTemplate } from "./chunks/LiveOpsLeaderboardEventTemplate";
import { LiveOpsSongShuffleEventTemplate } from "./chunks/LiveOpsSongShuffleEventTemplate";
import { LiveOpsTotaliserEventTemplate } from "./chunks/LiveOpsTotaliserEventTemplate";
import { Image } from "./reused/Image";
import { LiveOpsDeeplinkRewards } from "./reused/LiveOpsDeepLinkRewards";
import { NewsFeedStories } from "./reused/NewsFeedStories";

export const proto: Map<number, CMSField> = new Map([
  [
    5,
    {
      name: "requests",
      type: "group",
      fields: new Map([
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
                      80,
                      {
                        name: "test",
                        type: "group",
                        fields: new Map([
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
                            15,
                            {
                              name: "CampaignBoxSpeedupAdIntervalState",
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
                              fields: new Map([]),
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
                    [87, { name: "zendeskUserToken", type: "string" }],
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
                  ]),
                },
              ],
              [
                10,
                {
                  name: "newsFeedConfig",
                  type: "group",
                  fields: new Map([
                    [
                      1,
                      {
                        name: "NewsFeedStories",
                        type: "packed",
                        fields: NewsFeedStories,
                      },
                    ],
                    [100, { name: "version", type: "string" }],
                    [101, { name: "nextStoryId", type: "varint" }],
                  ]),
                },
              ],
              [
                11,
                {
                  name: "liveOpsBundleConfig",
                  type: "group",
                  fields: new Map([
                    [100, { name: "version", type: "string" }],
                    [101, { name: "nextBundleId", type: "varint" }],
                    [
                      102,
                      { name: "settings", type: "group", fields: new Map([]) },
                    ],
                  ]),
                },
              ],
              [
                12,
                {
                  name: "liveOpsDeeplinkRewardConfig",
                  type: "group",
                  fields: new Map([
                    [
                      1,
                      {
                        name: "LiveOpsDeeplinkRewards",
                        type: "packed",
                        fields: LiveOpsDeeplinkRewards,
                      },
                    ],
                    [100, { name: "version", type: "string" }],
                  ]),
                },
              ],
              [
                13,
                {
                  name: "liveOpsEventConfig",
                  type: "group",
                  fields: new Map([
                    [
                      3,
                      {
                        name: "LiveOpsEvents",
                        type: "packed",
                        fields: new Map([
                          [
                            1,
                            {
                              name: "type",
                              type: "enum",
                              enums: {
                                2: LiveOpsSongShuffleEventTemplate,
                                3: LiveOpsLeaderboardEventTemplate,
                                4: LiveOpsTotaliserEventTemplate,
                              },
                            },
                          ],
                          [3, { name: "id", type: "varint" }],
                          [4, { name: "idLabel", type: "string" }],
                          [5, { name: "nameTxt", type: "string" }],
                          [7, { name: "startTimeMsecs", type: "varint" }],
                          [8, { name: "endTimeMsecs", type: "varint" }],
                          [9, { name: "useLocalTime", type: "boolean" }],
                          [12, { name: "developmentState", type: "varint" }],
                          [13, { name: "template", type: "string" }],
                        ]),
                      },
                    ],
                    [100, { name: "version", type: "string" }],
                  ]),
                },
              ],

              [
                15,
                {
                  name: "liveOpsLoadingScreenConfig",
                  type: "group",
                  fields: new Map([
                    [
                      1,
                      {
                        name: "loadingScreens",
                        type: "packed",
                        fields: new Map([
                          [1, { name: "id", type: "varint" }],
                          [2, { name: "idLabel", type: "string" }],
                          [
                            3,
                            {
                              name: "mainImage",
                              type: "group",
                              fields: Image,
                            },
                          ],
                          [4, { name: "logoTintColor", type: "signed-varint" }],
                          [5, { name: "testTintColor", type: "signed-varint" }],
                          [6, { name: "timeLimited", type: "boolean" }],
                          [7, { name: "startTimeMsecs", type: "varint" }],
                          [8, { name: "endTimeMsecs", type: "varint" }],
                        ]),
                      },
                    ],
                    [1000, { name: "version", type: "string" }],
                  ]),
                },
              ],
            ]),
          },
        ],
      ]),
    },
  ],
]);
