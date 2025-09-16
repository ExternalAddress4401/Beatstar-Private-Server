import { Client } from "../Client";
import { Packet } from "../Packet";
import { ValueOf } from "../protobuf/interfaces/ValueOf";
import { createBatchRequest } from "../protobuf/protos/BatchRequest";
import { PlatformNotificationPref } from "../protobuf/protos/chunks/PlatformNotificationPref";
import { RegisterPlatformToken } from "../protobuf/protos/chunks/RegisterPlatformToken";
import { PartialReq } from "../protobuf/protos/reused/PartialReq";
import { SubscribeReq } from "../protobuf/protos/SubscribeReq";
import { SubscribeResp } from "../protobuf/protos/SubscribeResp";
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
  5: SubscribeReq,
  6: RegisterPlatformToken,
  9: PlatformNotificationPref,
});

export class NotificationService extends BaseService {
  name = "notificationservice";

  async handlePacket(packet: Packet, client: Client) {
    const payload = packet.parsePayload(PartialReq);
    const rpcType: ValueOf<typeof RpcType> = (RpcType as any)[
      Number(payload.requests.rpcType)
    ];
    const parsedPayload = packet.parsePayload(BatchRequest);

    if (rpcType === "SendNotification") {
    } else if (rpcType === "Subscribe") {
      const response = await packet.buildResponse(
        "ServerClientMessageHeader",
        "SubscribeResp",
        SubscribeResp
      );
      client.write(response);
    }
  }
}
