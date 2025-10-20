import { GetUnclaimedPurchasesReq } from "@externaladdress4401/protobuf/protos/GetUnclaimedPurchasesReq";
import { Client } from "../Client";
import Logger from "../lib/Logger";
import { Packet } from "../Packet";
import { BaseService } from "./BaseService";
import { createBatchRequest } from "@externaladdress4401/protobuf/protos/BatchRequest";
import { ValueOf } from "@externaladdress4401/protobuf/interfaces/ValueOf";
import { PartialReq } from "@externaladdress4401/protobuf/protos/reused/PartialReq";
import { GetUnclaimedPurchasesResp } from "@externaladdress4401/protobuf/protos/GetUnclaimedPurchasesResp";
import {
  createGetUnclaimedPurchasesResp,
  createServerClientMessageHeader,
} from "@externaladdress4401/protobuf/responses";

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

  async handlePacket(packet: Packet, client: Client) {
    const payload = packet.parsePayload(PartialReq);
    const rpcType: ValueOf<typeof RpcType> = (RpcType as any)[
      Number(payload.requests.rpcType)
    ];
    const parsedPayload = packet.parsePayload(BatchRequest);

    if (rpcType === "GetUnclaimedPurchases") {
      const response = await packet.buildResponse(
        createServerClientMessageHeader({}),
        createGetUnclaimedPurchasesResp({}),
        GetUnclaimedPurchasesResp,
        true
      );
      client.write(response);
    } else {
      Logger.warn(`${this.name}: Unknown rpcType: ${rpcType}`);
    }
  }
}
