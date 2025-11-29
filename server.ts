import net from "net";
import tls from "tls";
import { promises as fs } from "fs";
import { Client } from "./Client";
import { UserService } from "./services/UserService";
import { CMSService } from "./services/CMSService";
import { GameService } from "./services/GameService";
import { NotificationService } from "./services/NotificationService";
import { PaymentService } from "./services/PaymentService";
import { ReadOnlyGameService } from "./services/ReadOnlyGameService";
import { PingService } from "./services/PingService";
import { BaseService } from "./services/BaseService";
import { AnalyticsProxyService } from "./services/AnalyticsProxyService";
import Settings from "./Settings";
import { HttpServer } from "./HttpServer";
import Logger from "./lib/Logger";
import { ClientServerMessageHeaderMap } from "@externaladdress4401/protobuf/protos/ClientServerMessageHeader";

Settings.init();

let clientIndex = 0;
let serverIndex = 0;

const expressServer = new HttpServer();

const services = new Map<string, BaseService>();
const servicesToRegister = [
  new UserService(),
  new CMSService(),
  new GameService(),
  new NotificationService(),
  new PaymentService(),
  new ReadOnlyGameService(),
  new PingService(),
  new AnalyticsProxyService(),
];

for (const service of servicesToRegister) {
  services.set(service.name, service);
}

const clients = new Map<net.Socket, Client>();

let globalSocket: net.Socket | null;

net
  .createServer((socket) => {
    globalSocket = socket;

    clients.set(socket, new Client(socket));

    socket.on("data", async (data) => {
      const client = clients.get(socket!);
      if (!client) {
        return;
      }

      client.handlePacket(data);

      const packets = client.extractPackets();
      for (const packet of packets) {
        const header = packet.parseHeader(ClientServerMessageHeaderMap);

        if (!Settings.USE_PRIVATE_SERVER) {
          if (header.compressed) {
            await packet.payload.decompress();
          }

          await fs.writeFile(`./packets/client/${clientIndex++}`, data);
          client.reset();
          return;
        }

        const service = services.get(header.service);
        if (!service) {
          Logger.warn(`${header.service} is an unknown service.`);
          return;
        }

        Logger.info(
          `${service.name} received a packet.`,
          client.user.clide ?? undefined
        );

        await service.handlePacket(packet, client);
      }
      client.reset();
    });

    socket.on("end", () => {
      const client = clients.get(socket);
      clients.delete(socket);
      Logger.info("Client disconnected.", client?.user.clide);
      globalSocket = null;
    });

    socket.on("error", (err) => {
      const client = clients.get(socket);
      clients.delete(socket);
      Logger.error(err.message, client?.user.clide);
    });
  })
  .listen(Settings.SERVER_PORT, "0.0.0.0", () => {
    Logger.info("Local proxy server listening on port 3000");
  });
