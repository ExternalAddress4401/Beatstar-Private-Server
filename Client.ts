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
    let ready = false;
    if (!this.packet) {
      this.packet = new Packet(data);
      ready = this.packet.isReady();
    }

    if (!ready) {
      this.packet.process(data);
      ready = this.packet.isReady();
    }

    return ready;
  }
  reset() {
    this.packet = null;
  }
  write(buffer: Buffer) {
    this.socket.write(buffer);
  }
}
