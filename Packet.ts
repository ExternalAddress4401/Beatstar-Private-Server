import { handlePlaceholders } from "./utilities/handlePlaceholders";
import { ProtobufHandler } from "@externaladdress4401/protobuf/ProtobufHandler";
import { ClientServerMessageHeaderMap } from "@externaladdress4401/protobuf/protos/ClientServerMessageHeader";
import { ServerClientMessageHeaderMap } from "@externaladdress4401/protobuf/protos/ServerClientMessageHeader";
import { ErrorResp } from "@externaladdress4401/protobuf/protos/ErrorResp";
import {
  createErrorResp,
  createServerClientMessageHeader,
} from "@externaladdress4401/protobuf/responses";

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
    headerJson: any,
    responseJson: any,
    payloadProto: any,
    compress: boolean = false
  ) {
    headerJson.version = "1";
    headerJson.timestamp = Date.now();
    headerJson.tokenId = this.header.rpc;

    if (compress) {
      headerJson.compressed = true;
    }

    responseJson.serverTime = Date.now();

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

    return packetHandler.getUsed();
  }
  async buildErrorResponse(payloadReplacements?: Record<string, any> | null) {
    const headerJson: any = createServerClientMessageHeader({});

    const responseJson = createErrorResp({});

    headerJson.version = "1";
    headerJson.timestamp = Date.now();
    headerJson.tokenId = this.header.rpc;

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
      ErrorResp
    );

    const packetHandler = new ProtobufHandler("WRITE");
    packetHandler.writeIntBE(
      preparedHeader.length + preparedPayload.length + 4
    );
    packetHandler.writeIntBE(preparedHeader.length);
    packetHandler.writeBuffer(preparedHeader);
    packetHandler.writeBuffer(preparedPayload);

    return packetHandler.getUsed();
  }
}
