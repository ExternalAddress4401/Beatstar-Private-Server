import { Packet } from "../Packet";
import { ValueOf } from "../protobuf/interfaces/ValueOf";
import { createBatchRequest } from "../protobuf/protos/BatchRequest";
import { ExecuteSharplaAuditReq } from "../protobuf/protos/ExecuteSharplaAuditReq";
import { ExecuteSharplaAuditResp } from "../protobuf/protos/ExecuteSharplaAuditResp";
import { PartialReq } from "../protobuf/protos/reused/PartialReq";
import { SyncReq } from "../protobuf/protos/SyncReq";
import { SyncResp } from "../protobuf/protos/SyncResp";
import { BaseService } from "./BaseService";
import net from "net";

const RpcType = {
  2: "ProfileSync", // name wrong
  5: "Sync",
} as const;

const BatchRequest = createBatchRequest({
  2: SyncReq,
});

export class GameService extends BaseService {
  name = "gameservice";

  async handlePacket(packet: Packet, socket: net.Socket) {
    const payload = packet.parsePayload(PartialReq);
    const rpcType: ValueOf<typeof RpcType> = (RpcType as any)[
      Number(payload.requests.rpcType)
    ];
    const parsedPayload = packet.parsePayload(BatchRequest);

    if (rpcType === "ProfileSync") {
      const parsedPayload = packet.parsePayload(SyncReq);
      const response = await packet.buildResponse(
        "ServerClientMessageHeader",
        "SyncResp",
        SyncResp,
        null,
        true
      );
      socket.write(response);
    } else if (rpcType === "Sync") {
      console.log("IM IN DANGER!");
      const parsedPayload = packet.parsePayload(ExecuteSharplaAuditReq);
      console.log(parsedPayload);
      const response = await packet.buildResponse(
        "ServerClientMessageHeader",
        "ExecuteSharplaAuditResp",
        ExecuteSharplaAuditResp,
        null
      );
      socket.write(response);
    }
  }
}
