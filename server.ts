import net from "net";
import tls from "tls";
import { promises as fs } from "fs";
import { ProtobufHandler } from "./protobuf/ProtobufHandler";
import { ServerHeader } from "./protobuf/protos/ServerHeader";
import { Header } from "./protobuf/protos/Header";
import { AllInOneLoginReq } from "./protobuf/protos/AllInOneLoginReq";
import { AllInOneLoginResp } from "./protobuf/protos/AllInOneLoginResp";
import { CMSSyncReq } from "./protobuf/protos/CMSSyncReq";
import { CMSSyncResp } from "./protobuf/protos/CMSSyncResp";
import { SyncReq } from "./protobuf/protos/SyncReq";
import { SyncResp } from "./protobuf/protos/SyncResp";
import { Client } from "./Client";

let clientIndex = 0;
let serverIndex = 0;

// should we use the private server?
const useCustomServer = true;

const clients = new Map<net.Socket, Client>();

const saClient = tls.connect(
  {
    host: "socket-gateway.prod.flamingo.newbirds.net",
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

  globalSocket.write(data);

  const client = clients.get(globalSocket);
  if (!client) {
    console.log("no client");
    return;
  }

  const ready = client.handlePacket(data, ServerHeader);

  if (!ready) {
    return;
  }

  await fs.writeFile(`./packets/server/${serverIndex++}`, client.raw);

  const fullPayload = new ProtobufHandler("READ", client.data);

  if (client.header.compressed) {
    await fullPayload.decompress();
  }

  fullPayload.process();

  console.log("Server", fullPayload.bytes);

  // do something with the payload here
  client.reset();
});

net
  .createServer((socket) => {
    globalSocket = socket;

    clients.set(socket, new Client());

    socket.on("data", async (data) => {
      if (!useCustomServer) {
        await fs.writeFile(`./packets/client/${clientIndex++}`, data);
        // do some parsing here
        // write the original response
        saClient.write(data);
        return;
      }
      const client = clients.get(globalSocket!);
      if (!client) {
        return;
      }

      const ready = client.handlePacket(data, Header);

      if (!ready) {
        console.log("not ready");
        return;
      }

      if (!client.header) {
        console.log("client header empty");
        return;
      }

      console.log("READY!");

      const payload = new ProtobufHandler("READ", client.data);
      payload.process();

      console.log(payload);

      if (client.header.service === "userservice") {
        const parsedPayload = payload.parseProto(AllInOneLoginReq);

        socket.write(
          await buildPacket(
            "ServerHeader",
            "AllInOneLoginResp",
            AllInOneLoginResp,
            {
              id: "1",
              timestamp: Date.now(),
              tokenId: client.header.rpc,
            },
            {
              clide: crypto.randomUUID(),
              cinta: parsedPayload.reqAllInOneLogin.cinta,
              expiryTime: Date.now() + 100000000,
              authenticationTicket:
                "VCS1axRWJeq4jFJdpI3RFfnaIPjAV3ksi8W3cc3VYedwSiQFozfoIZpRN663Tmn4oswsBRTRcz6r8E+aDLuhDzh6xg/vB0e6SqjD2fpd/N1oY/4ulGb8qQ4qc2cGwuS4dPAPnGFW1WjP7SZ3MRJI0WRo2iHbz5Qlg21ssolAo0MTDWYPh0dtYg==",
            }
          )
        );

        client.reset();
      } else if (client.header.service === "cmsservice") {
        socket.write(
          await buildPacket(
            "ServerHeader",
            "CMSSyncResp",
            CMSSyncResp,
            {
              id: "1",
              timestamp: Date.now(),
              tokenId: client.header.rpc,
            },
            {
              serverTime: Date.now(),
            }
          )
        );
        client.reset();
      } else if (client.header.service === "gameservice") {
        const processedPayload = payload.parseProto(SyncReq);

        socket.write(
          await buildPacket(
            "ServerHeader",
            "SyncResp",
            SyncResp,
            {
              id: "1",
              timestamp: Date.now(),
              tokenId: client.header.rpc,
              compressed: true,
            },
            null,
            true
          )
        );
        client.reset();
        console.log("GAME WROTE!");
      } else if (client.header.service === "ping") {
        console.log("ping");
      } else {
        console.log(client.header.service);
        //console.log(client.header);
        //console.log(payload);
        //console.log("Data from local client:", data.toString());
        //client.write(data);
      }
    });

    socket.on("end", () => {
      console.log("Local client disconnected");
      globalSocket = null;
    });

    socket.on("error", (err) => {
      console.error("Local socket error:", err.message);
    });
  })
  .listen(3000, "0.0.0.0", () => {
    console.log("Local proxy server listening on port 3000");
  });

function preparePacket<T extends Record<string, any>>(
  body: T,
  replacements: { [K in keyof T]?: T[K] }
) {
  for (const key in replacements) {
    body[key] = replacements[key as keyof T] as T[typeof key];
  }

  for (const key in body) {
    if (typeof body[key] === "object" && body[key] !== null) {
      preparePacket(body[key], replacements);
    }
  }
}

async function buildPacket(
  headerFile: string,
  responseFile: string,
  payloadProto: any,
  headerReplacements?: Record<string, any> | null,
  payloadReplacements?: Record<string, any> | null,
  compress: boolean = false
) {
  console.log("handling custom server packet");

  const headerJson = JSON.parse(
    (await fs.readFile(`./protobuf/responses/${headerFile}.json`)).toString()
  );

  const numberRegex = /^-?\d+n$/;

  const responseJson = JSON.parse(
    (await fs.readFile(`./protobuf/responses/${responseFile}.json`)).toString(),
    (_, v) =>
      typeof v === "string" && numberRegex.test(v) && v.endsWith("n")
        ? BigInt(v.slice(0, -1))
        : v
  );

  if (headerReplacements) {
    preparePacket(headerJson, headerReplacements);
  }
  if (payloadReplacements) {
    preparePacket(responseJson, payloadReplacements);
  }

  const preparedHeader = await new ProtobufHandler("WRITE").writeProto(
    headerJson,
    ServerHeader
  );
  const preparedPayload = await new ProtobufHandler("WRITE").writeProto(
    responseJson,
    payloadProto,
    compress
  );

  console.log(preparedPayload, payloadProto);

  const packetHandler = new ProtobufHandler("WRITE");
  packetHandler.writeIntBE(preparedHeader.length + preparedPayload.length + 4);
  packetHandler.writeIntBE(preparedHeader.length);
  packetHandler.writeBuffer(preparedHeader);
  packetHandler.writeBuffer(preparedPayload);

  if (compress) {
    await fs.writeFile("./final.txt", packetHandler.getUsed());
  }

  return packetHandler.getUsed();
}
