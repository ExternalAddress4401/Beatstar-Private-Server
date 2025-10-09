import { Client } from "../Client";
import { Packet } from "../Packet";
import { ValueOf } from "../protobuf/interfaces/ValueOf";
import { createBatchRequest } from "../protobuf/protos/BatchRequest";
import { ExecuteSharplaAuditReq } from "../protobuf/protos/ExecuteSharplaAuditReq";
import { ExecuteSharplaAuditResp } from "../protobuf/protos/ExecuteSharplaAuditResp";
import { PartialReq } from "../protobuf/protos/reused/PartialReq";
import { SyncReq } from "../protobuf/protos/SyncReq";
import { SyncResp } from "../protobuf/protos/SyncResp";
import { createEmptyResponses } from "../protobuf/utils";
import { stringify } from "../utilities/stringify";
import { BaseService } from "./BaseService";

const RpcType = {
  5: "Sync",
  28: "ExecuteAudit",
} as const;

const BatchRequest = createBatchRequest({
  5: SyncReq,
  28: ExecuteSharplaAuditReq,
});

export class GameService extends BaseService {
  name = "gameservice";

  async handlePacket(packet: Packet, client: Client) {
    const payload = packet.parsePayload(PartialReq);
    const rpcType: ValueOf<typeof RpcType> = (RpcType as any)[
      Number(payload.requests[0].rpcType)
    ];
    const parsedPayload = packet.parsePayload(BatchRequest);

    if (rpcType === "Sync") {
      const parsedPayload = packet.parsePayload(SyncReq);
      const response = await packet.buildResponse(
        "ServerClientMessageHeader",
        "SyncResp",
        SyncResp,
        null,
        true
      );
      client.write(response);
    } else if (rpcType === "ExecuteAudit") {
      const parsedPayload = packet.parsePayload(ExecuteSharplaAuditReq);

      // print score response to do something with it for now
      console.log(stringify(parsedPayload.requests[0].body[0].audit[0]));

      const response = await packet.buildResponse(
        "ServerClientMessageHeader",
        "ExecuteSharplaAuditResp",
        ExecuteSharplaAuditResp,
        {
          "{requests}": createEmptyResponses(parsedPayload.requests),
        }
      );
      client.write(response);
    }
  }
}
