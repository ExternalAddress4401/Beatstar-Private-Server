import { Client } from "../Client";
import Logger from "../lib/Logger";
import { Packet } from "../Packet";
import { ValueOf } from "../protobuf/interfaces/ValueOf";
import { createBatchRequest } from "../protobuf/protos/BatchRequest";
import { Leaderboard_Req } from "../protobuf/protos/Leaderboard_Req";
import { Leaderboard_Resp } from "../protobuf/protos/Leaderboard_Resp";
import { PartialReq } from "../protobuf/protos/reused/PartialReq";
import { createEmptyResponses } from "../protobuf/utils";
import { BaseService } from "./BaseService";

const RpcType = {
  16: "Leaderboard",
} as const;

const BatchRequest = createBatchRequest({
  16: Leaderboard_Req,
});

export class ReadOnlyGameService extends BaseService {
  name = "readonlygameservice";

  async handlePacket(packet: Packet, client: Client) {
    const payload = packet.parsePayload(PartialReq);
    const rpcType: ValueOf<typeof RpcType> = (RpcType as any)[
      Number(payload.requests[0].rpcType)
    ];
    const parsedPayload = packet.parsePayload(BatchRequest);

    if (rpcType === "Leaderboard") {
      const response = await packet.buildResponse(
        "ServerClientMessageHeader",
        "Leaderboard_Resp",
        Leaderboard_Resp,
        {
          "{requests}": createEmptyResponses(parsedPayload.requests),
        }
      );
      client.write(response);
    } else {
      Logger.warn(`Unknown rpcType: ${rpcType}`);
    }
  }
}
