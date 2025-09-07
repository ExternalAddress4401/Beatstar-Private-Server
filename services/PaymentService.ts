import { Packet } from "../Packet";
import { ValueOf } from "../protobuf/interfaces/ValueOf";
import { createBatchRequest } from "../protobuf/protos/BatchRequest";
import { GetUnclaimedPurchasesReq } from "../protobuf/protos/GetUnclaimedPurchasesReq";
import { GetUnclaimedPurchasesResp } from "../protobuf/protos/GetUnclaimedPurchasesResp";
import { PartialReq } from "../protobuf/protos/reused/PartialReq";
import { BaseService } from "./BaseService";
import net from "net";

const RpcType = {
  0: "NA",
  1: "StartPurchase",
  2: "ConsumePurchase",
  3: "GetUnclaimedPurchases",
  4: "ClaimPurchase",
  5: "RefundPurchase",
  6: "UpdatePurchase",
} as const;

const BatchRequest = createBatchRequest({
  3: GetUnclaimedPurchasesReq,
});

export class PaymentService extends BaseService {
  name = "paymentservice";

  async handlePacket(packet: Packet, socket: net.Socket) {
    const payload = packet.parsePayload(PartialReq);
    const rpcType: ValueOf<typeof RpcType> = (RpcType as any)[
      Number(payload.requests.rpcType)
    ];
    const parsedPayload = packet.parsePayload(BatchRequest);

    if (rpcType === "GetUnclaimedPurchases") {
      const response = await packet.buildResponse(
        "ServerClientMessageHeader",
        "GetUnclaimedPurchasesResp",
        GetUnclaimedPurchasesResp,
        null,
        true
      );
      socket.write(response);
    }
  }
}
