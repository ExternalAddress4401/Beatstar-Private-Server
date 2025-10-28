import { GetUnclaimedPurchasesReq } from "@externaladdress4401/protobuf/protos/GetUnclaimedPurchasesReq";
import { Client } from "../Client";
import Logger from "../lib/Logger";
import { Packet } from "../Packet";
import { BaseService } from "./BaseService";
import { createBatchRequest } from "@externaladdress4401/protobuf/protos/BatchRequest";
import { ValueOf } from "@externaladdress4401/protobuf/interfaces/ValueOf";
import { GetUnclaimedPurchasesResp } from "@externaladdress4401/protobuf/protos/GetUnclaimedPurchasesResp";
import {
  createGetUnclaimedPurchasesResp,
  createServerClientMessageHeader,
} from "@externaladdress4401/protobuf/responses";
import { toArray } from "../utilities/toArray";
import { createEmptyResponse } from "@externaladdress4401/protobuf/utils";

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
    const parsedPayload = packet.parsePayload(BatchRequest);
    if (parsedPayload.requests === undefined) {
      Logger.saveError("Undefined requests in PAymentService", client.clide);
      Logger.saveError(packet.buffer.toString("hex"), client.clide);
      Logger.saveError(JSON.stringify(parsedPayload), client.clide);
      return;
    }

    const requests = toArray(parsedPayload.requests);
    const responses = [];

    for (const request of requests) {
      const rpcType: ValueOf<typeof RpcType> = (RpcType as any)[
        Number(request.rpcType)
      ];
      responses.push(createEmptyResponse(request));
    }

    const response = await packet.buildResponse(
      createServerClientMessageHeader({}),
      createGetUnclaimedPurchasesResp({
        "{requests}": responses,
      }),
      GetUnclaimedPurchasesResp,
      true
    );
    client.write(response);
  }
}
