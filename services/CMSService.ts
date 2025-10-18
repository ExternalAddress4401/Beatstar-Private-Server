import { Client } from "../Client";
import Logger from "../lib/Logger";
import { Packet } from "../Packet";
import { ValueOf } from "../protobuf/interfaces/ValueOf";
import { createBatchRequest } from "../protobuf/protos/BatchRequest";
import { GetCMSMetaInfoReq } from "../protobuf/protos/GetCMSMetaInfoReq";
import { GetCMSMetaInfoResp } from "../protobuf/protos/GetCMSMetaInfoResp";
import { PartialReq } from "../protobuf/protos/reused/PartialReq";
import Settings from "../Settings";
import { BaseService } from "./BaseService";
import localtunnel from "localtunnel";

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
      payload.requests.rpcType
    ];
    const parsedPayload = packet.parsePayload(BatchRequest);

    let serverIp = Settings.SERVER_IP;

    if (Settings.ENVIRONMENT === "dev") {
      serverIp = Settings.TUNNEL;
    }

    Logger.info(`Server IP: ${serverIp}`);

    if (rpcType === "GetCMSMetaInfo") {
      const hashesResponse = await fetch(
        `http://localhost:${Settings.EXPRESS_PORT}/info`
      );

      const cmsFilesAndHashes = await hashesResponse.json();

      const placeholders: Record<string, any> = {
        "{serverTime}": Date.now(),
        "{kirbyUrl}":
          serverIp + "/images/3cf7824c-d57d-4097-9953-4736f1956631.png",
      };

      for (const [key, value] of Object.entries(cmsFilesAndHashes)) {
        placeholders[`{${key}}`] = serverIp + `/cms/${key}.gz`;
        placeholders[`{${key}Checksum}`] = value;
      }

      const response = await packet.buildResponse(
        "ServerClientMessageHeader",
        "GetCMSMetaInfoResp",
        GetCMSMetaInfoResp,
        placeholders
      );
      client.write(response);
    } else {
      console.error(`Unhandled CMSService: ${rpcType}`);
    }
  }
}
