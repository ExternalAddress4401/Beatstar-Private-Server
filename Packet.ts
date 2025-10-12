import { ProtobufHandler } from "./protobuf/ProtobufHandler";
import { ClientServerMessageHeaderMap } from "./protobuf/protos/ClientServerMessageHeader";
import { ServerClientMessageHeaderMap } from "./protobuf/protos/ServerClientMessageHeader";
import { promises as fs } from "fs";
import { handlePlaceholders } from "./utilities/handlePlaceholders";
import Logger from "./lib/Logger";

export class Packet {
  buffer: Buffer;
  private _header: ProtobufHandler;
  private _payload: ProtobufHandler;
  header: Record<string, any> = {};
  payload: Record<string, any> = {};

  constructor(data: Buffer) {
    this.buffer = data;
    const handler = new ProtobufHandler("READ", data);

    const packetLength = handler.readIntBE();
    const headerLength = handler.readIntBE();
    const payloadLength = packetLength - 4 - headerLength;

    this._header = new ProtobufHandler("READ", handler.slice(headerLength));
    this._payload = new ProtobufHandler("READ", handler.slice(payloadLength));
  }
  process(data: Buffer) {
    this.buffer = Buffer.concat([this.buffer, data]);
  }
  parseHeader(
    proto:
      | typeof ClientServerMessageHeaderMap
      | typeof ServerClientMessageHeaderMap
  ) {
    if (Object.keys(this.header).length === 0) {
      this._header.process();
    }
    this.header = this._header.parseProto(proto);
    return this.header;
  }
  parsePayload(proto: any) {
    if (Object.keys(this.payload).length === 0) {
      this._payload.process();
    }
    this.payload = this._payload.parseProto(proto);
    return this.payload;
  }
  async buildResponse(
    headerFile: string,
    responseFile: string,
    payloadProto: any,
    payloadReplacements?: Record<string, any> | null,
    compress: boolean = false
  ) {
    Logger.info(`Handling ${responseFile} packet.`);

    const headerJson = JSON.parse(
      (await fs.readFile(`./protobuf/responses/${headerFile}.json`)).toString()
    );

    const numberRegex = /^-?\d+n$/;

    const responseJson = JSON.parse(
      (
        await fs.readFile(`./protobuf/responses/${responseFile}.json`)
      ).toString(),
      (_, v) =>
        typeof v === "string" && numberRegex.test(v) && v.endsWith("n")
          ? BigInt(v.slice(0, -1))
          : v
    );

    headerJson.version = "1";
    headerJson.timestamp = Date.now();
    headerJson.tokenId = this.header.rpc;

    if (compress) {
      headerJson.compressed = true;
    }

    responseJson.serverTime = Date.now();

    if (payloadReplacements) {
      handlePlaceholders(responseJson, payloadReplacements);
    }

    const preparedHeader = await new ProtobufHandler("WRITE").writeProto(
      headerJson,
      ServerClientMessageHeaderMap
    );
    const preparedPayload = await new ProtobufHandler("WRITE").writeProto(
      responseJson,
      payloadProto,
      compress
    );

    const packetHandler = new ProtobufHandler("WRITE");
    packetHandler.writeIntBE(
      preparedHeader.length + preparedPayload.length + 4
    );
    packetHandler.writeIntBE(preparedHeader.length);
    packetHandler.writeBuffer(preparedHeader);
    packetHandler.writeBuffer(preparedPayload);

    Logger.info(`Wrote ${responseFile} response.`);
    return packetHandler.getUsed();
  }
}
