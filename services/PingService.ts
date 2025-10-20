import { ProtobufHandler } from "@externaladdress4401/protobuf/ProtobufHandler";
import { Client } from "../Client";
import { Packet } from "../Packet";
import { BaseService } from "./BaseService";
import { ServerClientMessageHeaderMap } from "@externaladdress4401/protobuf/protos/ServerClientMessageHeader";
import { createServerClientMessageHeader } from "@externaladdress4401/protobuf/responses";

export class PingService extends BaseService {
  name = "ping";

  async handlePacket(packet: Packet, client: Client) {
    const response = await this.buildResponse(
      createServerClientMessageHeader({})
    );
    client.write(response);
  }
  async buildResponse(headerFile: any) {
    const headerJson = headerFile;

    headerJson.version = "1";
    headerJson.timestamp = Date.now();
    headerJson.tokenId = "ping";

    const preparedHeader = await new ProtobufHandler("WRITE").writeProto(
      headerJson,
      ServerClientMessageHeaderMap
    );

    const packetHandler = new ProtobufHandler("WRITE");
    packetHandler.writeIntBE(preparedHeader.length + 4);
    packetHandler.writeIntBE(preparedHeader.length);
    packetHandler.writeBuffer(preparedHeader);

    return packetHandler.getUsed();
  }
}
