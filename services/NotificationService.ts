import { Client } from "../Client";
import Logger from "../lib/Logger";
import { Packet } from "../Packet";
import { ValueOf } from "../protobuf/interfaces/ValueOf";
import { createBatchRequest } from "../protobuf/protos/BatchRequest";
import { PlatformNotificationPref } from "../protobuf/protos/chunks/PlatformNotificationPref";
import { RegisterPlatformTokenEnums } from "../protobuf/protos/chunks/RegisterPlatformToken";
import { PartialReq } from "../protobuf/protos/reused/PartialReq";
import { SubscribeReqEnums } from "../protobuf/protos/SubscribeReq";
import { SubscribeResp } from "../protobuf/protos/SubscribeResp";
import { createEmptyResponse } from "../protobuf/utils";
import { BaseService } from "./BaseService";

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
    const parsedPayload = packet.parsePayload(BatchRequest);

    if (!Array.isArray(parsedPayload.requests)) {
      console.log("notification", parsedPayload);
    }

    const responses = [];

    for (const request of parsedPayload.requests) {
      const rpcType: ValueOf<typeof RpcType> = (RpcType as any)[
        Number(parsedPayload.requests.rpcType)
      ];
      if (rpcType === "SendNotification") {
      } else if (rpcType === "Subscribe") {
        responses.push(createEmptyResponse(request));
      } else if (rpcType === "SetPlatformNotificationPrefs") {
        responses.push(createEmptyResponse(request));
      } else {
        Logger.warn(`${this.name}: Unknown rpcType: ${rpcType}`);
      }
    }

    const response = await packet.buildResponse(
      "ServerClientMessageHeader",
      "SubscribeResp",
      SubscribeResp,
      {
        "{requests}": responses,
      }
    );
    client.write(response);
  }
}
