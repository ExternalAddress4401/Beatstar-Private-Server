import { CMSField } from "../../interfaces/CMSField";

export const PlatformNotificationPref: Map<number, CMSField> = new Map([
  [
    4,
    {
      name: "body",
      type: "group",
      fields: new Map([
        [
          1,
          {
            name: "preferences",
            type: "group",
            fields: new Map([
              [1, { name: "language", type: "string" }],
              [
                2,
                {
                  name: "channelPreferences",
                  type: "packed",
                  fields: new Map([
                    [1, { name: "channel_id", type: "string" }],
                    [2, { name: "pushesEnabled", type: "boolean" }],
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
