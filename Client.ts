import net from "net";
import { Packet } from "./Packet";
import { ProtobufHandler } from "@externaladdress4401/protobuf/ProtobufHandler";
import Logger from "./lib/Logger";

export type ClientWithExistingUser = typeof Client & { user: ExistingUser };

type ExistingUser = {
  id: number;
  clide: string;
};

type User = {
  id: number | null;
  clide: string | null;
};

export class Client {
  buffer: Buffer = Buffer.alloc(0);
  packet: Packet | null = null;
  socket: net.Socket;
  user: User = {
    id: null,
    clide: null,
  };

  constructor(socket: net.Socket) {
    this.socket = socket;
  }
  setUser(id: number | undefined, clide: string) {
    if (id !== undefined && clide !== "") {
      this.user = {
        id,
        clide,
      };
    }
  }
  /**
   * Concatenates packet data into the buffer
   * @param {Buffer} data buffer to concatenate
   */
  handlePacket(data: Buffer) {
    this.buffer = Buffer.concat([this.buffer, data]);
  }
  /**
   * Extracts complete packets from the buffer. Multiple packets can be sent at once so we need to check lengths
   * @returns {Packet[]} packets ready to be processed
   */
  extractPackets() {
    const packets = [];
    while (true) {
      const handler = new ProtobufHandler("READ", this.buffer);
      if (!handler.hasMore()) {
        break;
      }
      if (handler.buffer.length < 4) {
        Logger.saveError("Tried to read int from buffer that was too small!");
        Logger.saveError(this.buffer.toString("hex"));
        return packets;
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
  /**
   * Narrows the client if the user exists
   * @returns {ClientWithExistingUser} client where user is guaranteed to be defined
   */
  hasUserId(): this is ClientWithExistingUser {
    return !!this.user.id;
  }
}
