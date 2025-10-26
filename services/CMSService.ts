import { createBatchRequest } from "@externaladdress4401/protobuf/protos/BatchRequest";
import { Client } from "../Client";
import Logger from "../lib/Logger";
import { Packet } from "../Packet";
import Settings from "../Settings";
import { BaseService } from "./BaseService";
import { GetCMSMetaInfoReq } from "@externaladdress4401/protobuf/protos/GetCMSMetaInfoReq";
import { PartialReq } from "@externaladdress4401/protobuf/protos/reused/PartialReq";
import { ValueOf } from "@externaladdress4401/protobuf/interfaces/ValueOf";
import { GetCMSMetaInfoResp } from "@externaladdress4401/protobuf/protos/GetCMSMetaInfoResp";
import {
  createGetCMSMetaInfoResp,
  createServerClientMessageHeader,
} from "@externaladdress4401/protobuf/responses";

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
      Settings.SERVER_IP = serverIp;
    }

    Logger.info(`Server IP: ${serverIp}`);

    if (rpcType === "GetCMSMetaInfo") {
      const hashesResponse = await fetch(
        `http://localhost:${Settings.EXPRESS_PORT}/info`
      );

      const cmsFilesAndHashes = await hashesResponse.json();

      const placeholders: Record<string, any> = {
        "{serverTime}": Date.now(),
      };

      for (const [key, value] of Object.entries(cmsFilesAndHashes)) {
        placeholders[`{${key}}`] = serverIp + `/cms/${key}.gz`;
        placeholders[`{${key}Checksum}`] = value;
      }

      const response = await packet.buildResponse(
        createServerClientMessageHeader({}),
        createGetCMSMetaInfoResp(placeholders),
        GetCMSMetaInfoResp
      );

      client.write(response);
    } else {
      console.error(`Unhandled CMSService: ${rpcType}`);
    }
  }
}
