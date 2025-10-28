import { SendAnalyticEventReq } from "@externaladdress4401/protobuf/protos/SendAnalyticEventReq";
import { Client } from "../Client";
import { Packet } from "../Packet";
import { BaseService } from "./BaseService";
import {
  createSendAnalyticEventResp,
  createServerClientMessageHeader,
} from "@externaladdress4401/protobuf/responses";
import { SendAnalyticEventResp } from "@externaladdress4401/protobuf/protos/SendAnalyticEventResp";
import Logger from "../lib/Logger";

export class AnalyticsProxyService extends BaseService {
  name = "analyticsproxyservicev2";

  async handlePacket(packet: Packet, client: Client) {
    const parsedPayload = packet.parsePayload(SendAnalyticEventReq);
    if (parsedPayload.requests === undefined) {
      Logger.error("Undefined requests", client.clide ?? undefined);
      Logger.error(packet.buffer.toString("hex"));
      Logger.error(JSON.stringify(parsedPayload));
      return;
    }

    const response = await packet.buildResponse(
      createServerClientMessageHeader({}),
      createSendAnalyticEventResp({}),
      SendAnalyticEventResp
    );
    client.write(response);
  }
}
