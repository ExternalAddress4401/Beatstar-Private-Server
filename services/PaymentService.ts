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
    let parsedPayload;
    try {
      parsedPayload = packet.parsePayload(BatchRequest);
    } catch (e) {
      Logger.saveClientError(
        "Unable to parse PaymentService request",
        { buffer: packet.buffer.toString("hex") },
        client.user.clide
      );
      return;
    }
    const requests = toArray(parsedPayload.requests);
    const responses = [];

    for (const request of requests) {
      // we're never going to use the payment service so just send an empty response
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
