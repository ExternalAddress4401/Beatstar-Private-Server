import { CMSField } from "../interfaces/CMSField";
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
                  name: "test",
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
            ]),
          },
        ],
      ]),
    },
  ],
]);
