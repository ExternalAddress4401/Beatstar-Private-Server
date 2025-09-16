import crypto from "crypto";
import net from "net";
import { Packet } from "./Packet";

export class Client {
  packet: Packet | null = null;
  socket: net.Socket;
  clide: string;

  constructor(socket: net.Socket) {
    this.socket = socket;
    this.clide = crypto.randomUUID();
  }
  handlePacket(data: Buffer) {
    if (!this.packet) {
      this.packet = new Packet(data);
    } else {
      this.packet.process(data);
    }

    return this.packet.isReady();
  }
  reset() {
    this.packet = null;
  }
  write(buffer: Buffer) {
    this.socket.write(buffer);
  }
}
