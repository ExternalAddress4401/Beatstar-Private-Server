import { CMSField } from "../interfaces/CMSField";
import { ReqHeader } from "./reused/ReqHeader";
import { ReqPayload } from "./reused/ReqPayload";

export const SyncReq: Map<number, CMSField> = new Map([
  ...ReqHeader,
  [
    5,
    {
      name: "requests",
      type: "group",
      fields: new Map([
        ...ReqPayload,
        [
          4,
          {
            name: "body",
            type: "group",
            fields: new Map([
              [
                3,
                {
                  name: "session",
                  type: "group",
                  fields: new Map([
                    [1, { name: "type", type: "varint" }],
                    [
                      2,
                      {
                        name: "version",
                        type: "group",
                        fields: new Map([
                          [
                            1,
                            {
                              name: "appVersion",
                              type: "group",
                              fields: new Map([
                                [1, { name: "appVersion", type: "string" }],
                              ]),
                            },
                          ],
                          [
                            2,
                            {
                              name: "analytics_device",
                              type: "group",
                              fields: new Map([
                                [1, { name: "app_store", type: "string" }],
                                [2, { name: "os", type: "string" }],
                                [3, { name: "os_version", type: "string" }],
                                [4, { name: "model", type: "string" }],
                                [5, { name: "locale", type: "string" }],
                                [6, { name: "country_code", type: "string" }],
                                [7, { name: "lang", type: "string" }],
                                [8, { name: "width", type: "varint" }],
                                [9, { name: "height", type: "varint" }],
                                [10, { name: "dpi", type: "varint" }],
                                [11, { name: "timezone", type: "string" }],
                                [12, { name: "system_memory", type: "varint" }],
                                [
                                  13,
                                  { name: "graphics_memory", type: "varint" },
                                ],
                                [14, { name: "shader_level", type: "varint" }],
                                [
                                  15,
                                  { name: "graphics_chipset", type: "string" },
                                ],
                                [16, { name: "lod", type: "string" }],
                              ]),
                            },
                          ],
                          [
                            3,
                            {
                              name: "analytics_attribution",
                              type: "group",
                              fields: new Map([
                                [1, { name: "provider", type: "string" }],
                                [2, { name: "id", type: "string" }],
                                [3, { name: "lat", type: "boolean" }],
                              ]),
                            },
                          ],
                          [
                            9,
                            {
                              name: "appValidationData",
                              type: "string",
                            },
                          ],
                        ]),
                      },
                    ],
                    [3, { name: "timestampMsecs", type: "varint" }],
                    [4, { name: "clide", type: "string" }],
                    [
                      5,
                      {
                        name: "sharplaData",
                        type: "group",
                        fields: new Map([
                          [1, { name: "clide", type: "string" }],
                          [3, { name: "version", type: "varint" }],
                          [4, { name: "sessionGuid", type: "string" }],
                          [9, { name: "platform", type: "varint" }],
                          [13, { name: "clientVersion", type: "string" }],
                          [14, { name: "appId", type: "string" }],
                          [15, { name: "installId", type: "string" }],
                          [
                            8,
                            {
                              name: "offsetFromUTCMsecs",
                              type: "varint",
                            },
                          ],
                        ]),
                      },
                    ],
                  ]),
                },
              ],
              [4, { name: "langConfigVersion", type: "string" }],
              [5, { name: "gameConfigVersion", type: "string" }],
              [6, { name: "songConfigVersion", type: "string" }],
              [7, { name: "callingCardConfigVersion", type: "string" }],
              [8, { name: "liveOpsProfileIconConfigVersion", type: "string" }],
              [9, { name: "liveOpsTrackSkinConfigVersion", type: "string" }],
              [10, { name: "liveOpsEmojiConfigVersion", type: "string" }],
            ]),
          },
        ],
      ]),
    },
  ],
  [6, { name: "authenticationTicket", type: "string" }],
]);
