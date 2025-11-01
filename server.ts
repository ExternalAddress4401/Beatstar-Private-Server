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

const saClient = tls.connect(
  {
    host: "socket-gateway.prod.robin.newbirds.net",
    port: 443,
  },
  () => {
    console.log("Connected to remote TLS server");
  }
);

saClient.on("error", (err) => {
  console.error("TLS client error:", err.message);
});

let globalSocket: net.Socket | null;

// this will only run if useCustomServer is false
// sa server isn't used otherwise
saClient.on("data", async (data) => {
  if (!globalSocket) {
    return;
  }

  const client = clients.get(globalSocket);
  if (!client) {
    return;
  }

  client.write(data);

  client.handlePacket(data);

  const packets = client.extractPackets();
  for (const packet of packets) {
    await fs.writeFile(`./packets/server/${serverIndex++}`, data);
    globalSocket.write(packet.buffer);
    client.reset();
  }

  /*const fullPayload = new ProtobufHandler("READ", client.packet?.payload);

  if (client.packet?.header.compressed) {
    await fullPayload.decompress();
  }

  fullPayload.process();

  console.log("Server", fullPayload.bytes);

  // do something with the payload here
  client.reset();*/
});

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

        if (!client.clide) {
          client.setClide(header.clide);
        }

        if (!Settings.USE_PRIVATE_SERVER) {
          if (header.compressed) {
            await packet.payload.decompress();
          }

          await fs.writeFile(`./packets/client/${clientIndex++}`, data);
          saClient.write(data);
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
          client.clide ?? undefined
        );

        await service.handlePacket(packet, client);
      }
      client.reset();
    });

    socket.on("end", () => {
      const client = clients.get(socket);
      clients.delete(socket);
      Logger.info("Client disconnected.", client?.clide);
      globalSocket = null;
    });

    socket.on("error", (err) => {
      const client = clients.get(socket);
      clients.delete(socket);
      Logger.error(err.message, client?.clide);
    });
  })
  .listen(Settings.SERVER_PORT, "0.0.0.0", () => {
    Logger.info("Local proxy server listening on port 3000");
  });
