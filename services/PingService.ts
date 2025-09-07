import { Packet } from "../Packet";
import { BaseService } from "./BaseService";
import net from "net";

export class PingService extends BaseService {
  name = "ping";

  async handlePacket(packet: Packet, socket: net.Socket) {}
}
