import { Packet } from "../Packet";
import net from "net";

export abstract class BaseService {
  abstract name: string;
  abstract handlePacket(packet: Packet, socket: net.Socket): Promise<void>;
}
