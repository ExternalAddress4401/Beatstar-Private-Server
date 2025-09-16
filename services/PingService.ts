import { Client } from "../Client";
import { Packet } from "../Packet";
import { ProtobufHandler } from "../protobuf/ProtobufHandler";
import { ServerClientMessageHeaderMap } from "../protobuf/protos/ServerClientMessageHeader";
import { BaseService } from "./BaseService";
import { promises as fs } from "fs";

export class PingService extends BaseService {
  name = "ping";

  async handlePacket(packet: Packet, client: Client) {
    const response = await this.buildResponse("ServerClientMessageHeader");
    client.write(response);
  }
  async buildResponse(headerFile: string) {
    const headerJson = JSON.parse(
      (await fs.readFile(`./protobuf/responses/${headerFile}.json`)).toString()
    );

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
