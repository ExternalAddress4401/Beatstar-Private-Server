import { Client } from "../Client";
import { Packet } from "../Packet";
import { ValueOf } from "../protobuf/interfaces/ValueOf";
import { createBatchRequest } from "../protobuf/protos/BatchRequest";
import { PartialReq } from "../protobuf/protos/reused/PartialReq";
import { SendAnalyticEventReq } from "../protobuf/protos/SendAnalyticEventReq";
import { SendAnalyticEventResp } from "../protobuf/protos/SendAnalyticEventResp";
import { BaseService } from "./BaseService";

const RpcType = {
  0: "NA",
  1: "GetCMSMetaInfo",
  2: "GetCMS",
  3: "GetABTests",
  4: "AllocateABTests",
} as const;

const BatchRequest = createBatchRequest({
  1: SendAnalyticEventReq,
});

export class AnalyticsProxyService extends BaseService {
  name = "analyticsproxyservicev2";

  async handlePacket(packet: Packet, client: Client) {
    const req = client.packet?.parsePayload(SendAnalyticEventReq);

    console.log(
      JSON.stringify(
        req,
        (_, v) => (typeof v === "bigint" ? v.toString() : v),
        2
      )
    );

    const response = await packet.buildResponse(
      "ServerClientMessageHeader",
      "SendAnalyticEventResp",
      SendAnalyticEventResp,
      {
        serverTime: Date.now(),
      }
    );

    console.log(response);
    client.write(response);
  }
}
