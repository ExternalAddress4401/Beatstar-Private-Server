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
    let parsedPayload;
    try {
      parsedPayload = packet.parsePayload(SendAnalyticEventReq);
    } catch (e) {
      Logger.saveClientError(
        `Unable to parse AnalyticsProxyService request`,
        { buffer: packet.buffer.toString("hex") },
        client.user.clide
      );
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
