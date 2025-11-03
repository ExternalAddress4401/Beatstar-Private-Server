import { SubscribeReqEnums } from "@externaladdress4401/protobuf/protos/SubscribeReq";
import { Client } from "../Client";
import Logger from "../lib/Logger";
import { Packet } from "../Packet";
import { BaseService } from "./BaseService";
import { RegisterPlatformTokenEnums } from "@externaladdress4401/protobuf/protos/chunks/RegisterPlatformToken";
import { PlatformNotificationPref } from "@externaladdress4401/protobuf/protos/chunks/PlatformNotificationPref";
import { createBatchRequest } from "@externaladdress4401/protobuf/protos/BatchRequest";
import { createEmptyResponse } from "@externaladdress4401/protobuf/utils";
import { ValueOf } from "@externaladdress4401/protobuf/interfaces/ValueOf";
import { SubscribeResp } from "@externaladdress4401/protobuf/protos/SubscribeResp";
import { toArray } from "../utilities/toArray";
import {
  createServerClientMessageHeader,
  createSubscribeResp,
} from "@externaladdress4401/protobuf/responses";

const RpcType = {
  0: "NA",
  1: "Poll",
  2: "SendNotification",
  4: "Unsubscribe",
  5: "Subscribe",
  6: "RegisterPlatformToken",
  7: "SendPlatformNotification",
  8: "GetPlatformNotificationPrefs",
  9: "SetPlatformNotificationPrefs",
} as const;

const BatchRequest = createBatchRequest({
  5: SubscribeReqEnums,
  6: RegisterPlatformTokenEnums,
  9: PlatformNotificationPref,
});

export class NotificationService extends BaseService {
  name = "notificationservice";

  async handlePacket(packet: Packet, client: Client) {
    let parsedPayload;
    try {
      parsedPayload = packet.parsePayload(BatchRequest);
    } catch (e) {
      Logger.saveError("Unparsable NotificationService request", client.clide);
      Logger.saveError(packet.buffer.toString("hex"), client.clide);
      return;
    }

    const requests = toArray(parsedPayload.requests);
    const responses = [];

    for (const request of requests) {
      const rpcType: ValueOf<typeof RpcType> = (RpcType as any)[
        Number(request.rpcType)
      ];
      if (rpcType === "SendNotification") {
      } else if (rpcType === "Subscribe") {
        responses.push(createEmptyResponse(request));
      } else if (rpcType === "SetPlatformNotificationPrefs") {
        responses.push(createEmptyResponse(request));
      } else {
        Logger.warn(`${this.name}: Unknown rpcType: ${request.rpcType}`);
        responses.push(createEmptyResponse(request));
      }
    }

    const response = await packet.buildResponse(
      createServerClientMessageHeader({}),
      createSubscribeResp({
        "{requests}": responses,
      }),
      SubscribeResp
    );
    client.write(response);
  }
}
