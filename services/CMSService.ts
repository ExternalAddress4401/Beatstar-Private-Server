import { Client } from "../Client";
import { Packet } from "../Packet";
import { ValueOf } from "../protobuf/interfaces/ValueOf";
import { createBatchRequest } from "../protobuf/protos/BatchRequest";
import { GetCMSMetaInfoReq } from "../protobuf/protos/GetCMSMetaInfoReq";
import { GetCMSMetaInfoResp } from "../protobuf/protos/GetCMSMetaInfoResp";
import { PartialReq } from "../protobuf/protos/reused/PartialReq";
import { BaseService } from "./BaseService";

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

    if (rpcType === "GetCMSMetaInfo") {
      const response = await packet.buildResponse(
        "ServerClientMessageHeader",
        "GetCMSMetaInfoResp",
        GetCMSMetaInfoResp,
        {
          serverTime: Date.now(),
        }
      );
      client.write(response);
    } else {
      console.error(`Unhandled CMSService: ${rpcType}`);
    }
  }
}
