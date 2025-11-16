import { Client } from "../Client";
import { Packet } from "../Packet";

/**
 * The abstract shape for services
 */
export abstract class BaseService {
  abstract name: string;
  abstract handlePacket(packet: Packet, client: Client): Promise<void>;
}
