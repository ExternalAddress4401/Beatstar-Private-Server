import crypto from "crypto";
import { ProtobufHandler } from "./protobuf/ProtobufHandler";

export class Client {
  expectedByteCount: number | null = null;
  header: Record<string, any>;
  data: Buffer = Buffer.alloc(0);
  clide: string;

  constructor() {
    this.clide = crypto.randomUUID();
  }
  handlePacket(data: Buffer, headerProto: any) {
    if (!this.expectedByteCount) {
      const handler = new ProtobufHandler("READ", data);
      const packetLength = handler.readIntBE();
      const headerLength = handler.readIntBE();
      const header = new ProtobufHandler("READ", handler.slice(headerLength));

      header.process();

      this.header = header.parseProto(headerProto);
      this.expectedByteCount = packetLength + 4 - 8 - headerLength;

      this.data = Buffer.concat([this.data, handler.slice(packetLength)]);
    } else {
      this.data = Buffer.concat([this.data, data]);
    }

    return this.expectedByteCount === this.data.length;
  }
  reset() {
    this.expectedByteCount = null;
    this.data = Buffer.alloc(0);
  }
}
