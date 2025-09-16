import { CMSField } from "../interfaces/CMSField";
import { AnalyticsEventDynamicTO } from "./TO/AnalyticsEventDynamicTO";

export const SendAnalyticEventReq: Map<number, CMSField> = new Map([
  [1, { name: "type", type: "varint" }],
  [
    2,
    {
      name: "events",
      type: "group",
      fields: new Map([
        [
          1,
          {
            name: "analyticEvents",
            type: "group",
            fields: new Map([
              [
                1,
                {
                  name: "type",
                  type: "enum",
                  enums: {
                    3: AnalyticsEventDynamicTO,
                  },
                },
              ],
              [3, { name: "event_type", type: "string" }],
              [4, { name: "event_id", type: "string" }],
              [5, { name: "event_time", type: "varint" }],
              [6, { name: "event_arrival_time", type: "varint" }],
              [7, { name: "event_version", type: "string" }],
              [
                8,
                {
                  name: "application",
                  type: "group",
                  fields: new Map([
                    [1, { name: "app_id", type: "string" }],
                    [2, { name: "app_version", type: "string" }],
                    [3, { name: "install_id", type: "string" }],
                  ]),
                },
              ],
              [
                9,
                {
                  name: "client",
                  type: "group",
                  fields: new Map([[1, { name: "clide", type: "string" }]]),
                },
              ],
              [
                10,
                {
                  name: "session",
                  type: "group",
                  fields: new Map([
                    [1, { name: "start_time", type: "varint" }],
                    [2, { name: "number", type: "varint" }],
                  ]),
                },
              ],
              [
                11,
                {
                  name: "server",
                  type: "group",
                  fields: new Map([
                    [1, { name: "environment", type: "string" }],
                    [2, { name: "service_name", type: "string" }],
                    [3, { name: "service_version", type: "string" }],
                    [
                      5,
                      {
                        name: "config_versions",
                        type: "group",
                        fields: new Map([
                          [3, { name: "game_config", type: "string" }],
                          [4, { name: "lang_config", type: "string" }],
                          [5, { name: "matchmaking_config", type: "string" }],
                          [6, { name: "quest_config", type: "string" }],
                        ]),
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
]);
