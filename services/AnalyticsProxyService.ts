import { Client } from "../Client";
import { Packet } from "../Packet";
import { SendAnalyticEventReq } from "../protobuf/protos/SendAnalyticEventReq";
import { SendAnalyticEventResp } from "../protobuf/protos/SendAnalyticEventResp";
import { BaseService } from "./BaseService";

export class AnalyticsProxyService extends BaseService {
  name = "analyticsproxyservicev2";

  async handlePacket(packet: Packet, client: Client) {
    const req = client.packet?.parsePayload(SendAnalyticEventReq);

    const response = await packet.buildResponse(
      "ServerClientMessageHeader",
      "SendAnalyticEventResp",
      SendAnalyticEventResp,
      {
        serverTime: Date.now(),
      }
    );
    client.write(response);
  }
}
