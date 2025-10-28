import { Client } from "../Client";
import Logger from "../lib/Logger";
import { Packet } from "../Packet";
import { BaseService } from "./BaseService";
import { createBatchRequest } from "@externaladdress4401/protobuf/protos/BatchRequest";
import { ValueOf } from "@externaladdress4401/protobuf/interfaces/ValueOf";
import { Leaderboard_Resp } from "@externaladdress4401/protobuf/protos/Leaderboard_Resp";
import { createEmptyResponse } from "@externaladdress4401/protobuf/utils";
import { toArray } from "../utilities/toArray";
import {
  createGetUnclaimedPurchasesResp,
  createServerClientMessageHeader,
} from "@externaladdress4401/protobuf/responses";
import { Leaderboard_ReqEnums } from "@externaladdress4401/protobuf/protos/Leaderboard_Req";

const RpcType = {
  16: "Leaderboard",
} as const;

const BatchRequest = createBatchRequest({
  16: Leaderboard_ReqEnums,
});

export class ReadOnlyGameService extends BaseService {
  name = "readonlygameservice";

  async handlePacket(packet: Packet, client: Client) {
    const parsedPayload = packet.parsePayload(BatchRequest);
    if (parsedPayload.requests === undefined) {
      Logger.error("Undefined requests in ReadOnlyGameService", client.clide);
      Logger.error(packet.buffer.toString("hex"), client.clide);
      Logger.error(JSON.stringify(parsedPayload), client.clide);
      return;
    }

    const requests = toArray(parsedPayload.requests);
    const responses = [];

    for (const request of requests) {
      const rpcType: ValueOf<typeof RpcType> = (RpcType as any)[
        Number(request.rpcType)
      ];
      if (rpcType === "Leaderboard") {
        responses.push(createEmptyResponse(request));
      } else {
        Logger.warn(`${this.name}: Unknown rpcType: ${rpcType}`);
      }
    }

    const response = await packet.buildResponse(
      createServerClientMessageHeader({}),
      createGetUnclaimedPurchasesResp({
        "{requests}": responses,
      }),
      Leaderboard_Resp
    );

    client.write(response);
  }
}
