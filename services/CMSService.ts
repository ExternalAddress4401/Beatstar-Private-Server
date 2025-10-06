import { Client } from "../Client";
import { Packet } from "../Packet";
import { ValueOf } from "../protobuf/interfaces/ValueOf";
import { createBatchRequest } from "../protobuf/protos/BatchRequest";
import { GetCMSMetaInfoReq } from "../protobuf/protos/GetCMSMetaInfoReq";
import { GetCMSMetaInfoResp } from "../protobuf/protos/GetCMSMetaInfoResp";
import { PartialReq } from "../protobuf/protos/reused/PartialReq";
import Settings from "../Settings";
import { BaseService } from "./BaseService";

const cmsFiles = [
  "GameConfig",
  "SongConfig",
  "AssetsPatchConfig",
  "LangConfig",
  "AudioConfig",
  "NotificationConfig",
  "ScalingConfig",
  "FontFallbackConfig",
  "LiveOpsCallingCardsConfig",
  "LiveOpsProfileIconConfig",
  "LiveOpsTrackSkinConfig",
  "LiveOpsEmojiConfig",
];

const CMSType = {
  0: "NA",
  1: "GetCMSMetaInfo",
  2: "GetCMS",
  3: "GetABTests",
  4: "AllocateABTests",
} as const;

const BatchRequest = createBatchRequest({
  1: GetCMSMetaInfoReq,
});

export class CMSService extends BaseService {
  name = "cmsservice";

  async handlePacket(packet: Packet, client: Client) {
    const payload = packet.parsePayload(PartialReq);
    const rpcType: ValueOf<typeof CMSType> = (CMSType as any)[
      payload.requests[0].rpcType
    ];
    const parsedPayload = packet.parsePayload(BatchRequest);

    let serverIp;

    if (Settings.ENVIRONMENT === "dev") {
      const response = await fetch("http://127.0.0.1:4040/api/tunnels");
      const { tunnels } = await response.json();
      serverIp = tunnels[0].public_url;
    }

    if (!serverIp) {
      serverIp = Settings.SERVER_IP;
    }

    console.log("Server ip: " + serverIp);

    if (rpcType === "GetCMSMetaInfo") {
      // TODO: programatically add hashes so I can edit these
      const response = await packet.buildResponse(
        "ServerClientMessageHeader",
        "GetCMSMetaInfoResp",
        GetCMSMetaInfoResp,
        {
          "{serverTime}": Date.now(),
          "{GameConfig}": serverIp + "/cms/GameConfig.gz",
          "{SongConfig}": serverIp + "/cms/SongConfig.gz",
          "{AssetsPatchConfig}": serverIp + "/cms/AssetsPatchConfig.gz",
          "{LangConfig}": serverIp + "/cms/LangConfig.gz",
          "{AudioConfig}": serverIp + "/cms/AudioConfig.gz",
          "{NotificationConfig}": serverIp + "/cms/NotificationConfig.gz",
          "{ScalingConfig}": serverIp + "/cms/ScalingConfig.gz",
          "{FontFallbackConfig}": serverIp + "/cms/FontFallbackConfig.gz",
          "{LiveOpsCallingCardsConfig}":
            serverIp + "/cms/LiveOpsCallingCardsConfig.gz",
          "{LiveOpsProfileIconConfig}":
            serverIp + "/cms/LiveOpsProfileIconConfig.gz",
          "{LiveOpsTrackSkinConfig}":
            serverIp + "/cms/LiveOpsTrackSkinConfig.gz",
          "{LiveOpsEmojiConfig}": serverIp + "/cms/LiveOpsEmojiConfig.gz",
        }
      );
      client.write(response);
    } else {
      console.error(`Unhandled CMSService: ${rpcType}`);
    }
  }
}
