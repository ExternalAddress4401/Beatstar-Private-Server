import { Client } from "../Client";
import { Packet } from "../Packet";

export abstract class BaseService {
  abstract name: string;
  abstract handlePacket(packet: Packet, client: Client): Promise<void>;
}
