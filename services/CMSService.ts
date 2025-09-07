import { Packet } from "../Packet";
import { ValueOf } from "../protobuf/interfaces/ValueOf";
import { createBatchRequest } from "../protobuf/protos/BatchRequest";
import { GetCMSMetaInfoReq } from "../protobuf/protos/GetCMSMetaInfoReq";
import { GetCMSMetaInfoResp } from "../protobuf/protos/GetCMSMetaInfoResp";
import { PartialReq } from "../protobuf/protos/reused/PartialReq";
import { BaseService } from "./BaseService";
import net from "net";

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

  async handlePacket(packet: Packet, socket: net.Socket) {
    const payload = packet.parsePayload(PartialReq);
    const rpcType: ValueOf<typeof CMSType> = (CMSType as any)[
      payload.requests.rpcType
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
      socket.write(response);
    }
  }
}
