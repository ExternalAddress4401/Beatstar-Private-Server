import { CMSField } from "../interfaces/CMSField";
import { liveOpsBundleConfig } from "./configs/liveOpsBundleConfig";
import { liveOpsDeeplinkRewardConfig } from "./configs/liveOpsDeeplinkRewardConfig";
import { liveOpsEventConfig } from "./configs/liveOpsEventConfig";
import { liveOpsLoadingScreenConfig } from "./configs/liveOpsLoadingScreenConfig";
import { liveOpsSeasonConfig } from "./configs/liveOpsSeasonConfig";
import { newsFeedConfig } from "./configs/newsFeedConfig";
import { RespHeader } from "./reused/RespHeader";
import { MyProfileTO } from "./game/com/spaceape/flamingo/model/MyProfileTO";
import { RespPayload } from "./reused/RespPayload";

export const SyncResp: Map<number, CMSField> = new Map([
  ...RespHeader,
  [
    5,
    {
      name: "requests",
      type: "group",
      fields: new Map([
        ...RespPayload,
        [
          5,
          {
            name: "body",
            type: "group",
            fields: new Map([
              [
                7,
                {
                  name: "profile",
                  type: "group",
                  fields: MyProfileTO,
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
