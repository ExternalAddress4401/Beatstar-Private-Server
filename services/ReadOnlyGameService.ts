import { Client } from "../Client";
import { Packet } from "../Packet";
import { ValueOf } from "../protobuf/interfaces/ValueOf";
import { createBatchRequest } from "../protobuf/protos/BatchRequest";
import { Leaderboard_Req } from "../protobuf/protos/Leaderboard_Req";
import { Leaderboard_Resp } from "../protobuf/protos/Leaderboard_Resp";
import { PartialReq } from "../protobuf/protos/reused/PartialReq";
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
      Number(payload.requests.rpcType)
    ];
    const parsedPayload = packet.parsePayload(BatchRequest);

    if (rpcType === "Leaderboard") {
      const response = await packet.buildResponse(
        "ServerClientMessageHeader",
        "Leaderboard_Resp",
        Leaderboard_Resp
      );
      client.write(response);
    }
  }
}
