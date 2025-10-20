import { SendAnalyticEventReq } from "@externaladdress4401/protobuf/protos/SendAnalyticEventReq";
import { Client } from "../Client";
import { Packet } from "../Packet";
import { BaseService } from "./BaseService";
import { SendAnalyticEventResp } from "@externaladdress4401/protobuf/protos/SendAnalyticEventResp";
import {
  createSendAnalyticEventResp,
  createServerClientMessageHeader,
} from "@externaladdress4401/protobuf/responses";

export class AnalyticsProxyService extends BaseService {
  name = "analyticsproxyservicev2";

  async handlePacket(packet: Packet, client: Client) {
    const req = client.packet?.parsePayload(SendAnalyticEventReq);

    const response = await packet.buildResponse(
      createServerClientMessageHeader({}),
      createSendAnalyticEventResp({}),
      SendAnalyticEventResp
    );
    client.write(response);
  }
}
