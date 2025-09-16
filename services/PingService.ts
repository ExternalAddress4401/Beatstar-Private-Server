import { Client } from "../Client";
import { Packet } from "../Packet";
import { BaseService } from "./BaseService";

export class PingService extends BaseService {
  name = "ping";

  async handlePacket(packet: Packet, client: Client) {}
}
