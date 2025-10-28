import net from "net";
import { Packet } from "./Packet";
import { ProtobufHandler } from "@externaladdress4401/protobuf/ProtobufHandler";

export class Client {
  buffer: Buffer = Buffer.alloc(0);
  packet: Packet | null = null;
  socket: net.Socket;
  clide: string | null = null;

  constructor(socket: net.Socket) {
    this.socket = socket;
  }
  setClide(clide: string) {
    if (clide) {
      this.clide = clide.trim();
    }
  }
  handlePacket(data: Buffer) {
    this.buffer = Buffer.concat([this.buffer, data]);
  }
  extractPackets() {
    const packets = [];
    while (true) {
      const handler = new ProtobufHandler("READ", this.buffer);
      if (!handler.hasMore()) {
        break;
      }
      const length = handler.readIntBE() + 4;
      if (handler.buffer.length >= length) {
        handler.index -= 4;
        packets.push(new Packet(handler.slice(length)));
        this.buffer = this.buffer.subarray(length);
      } else {
        break;
      }
    }
    return packets;
  }
  reset() {
    this.packet = null;
  }
  write(buffer: Buffer) {
    this.socket.write(buffer);
  }
}
