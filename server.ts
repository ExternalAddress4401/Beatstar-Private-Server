import net from "net";
import tls from "tls";
import { promises as fs } from "fs";
import { ProtobufHandler } from "./protobuf/ProtobufHandler";
import { proto as ServerHeader } from "./protobuf/protos/ServerHeader";
import { proto as Header } from "./protobuf/protos/Header";
import { proto as AllInOneLoginReq } from "./protobuf/protos/AllInOneLoginReq";
import { proto as AllInOneLoginResp } from "./protobuf/protos/AllInOneLoginResp";
import { proto as CMSSyncReq } from "./protobuf/protos/CMSSyncReq";
import { proto as CMSSyncResp } from "./protobuf/protos/CMSSyncResp";
import { proto as StartSharplaSessionReq } from "./protobuf/protos/StartSharplaSessionReq";
import { proto as StartSharplaSessionResp } from "./protobuf/protos/StartSharplaSessionResp";
import { Client } from "./Client";

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

let globalSocket;

saClient.on("data", async (data) => {
  const client = clients.get(globalSocket);
  if (!client) {
    return;
  }

  const ready = client.handlePacket(data, ServerHeader);

  if (!ready) {
    return;
  }

  const fullPayload = new ProtobufHandler("READ", client.data);

  if (client.header.compressed) {
    await fullPayload.decompress();
  }

  const { dict } = fullPayload.process();

  console.log("www", client);
  if (client.expectedByteCount >= 42192) {
    console.log("in");
    await fs.writeFile("./profile", fullPayload.buffer);
    const r = fullPayload.parseProto(StartSharplaSessionResp);
    console.log(r);
    process.exit();
  }

  console.log(dict);

  if (globalSocket) {
    globalSocket.write(data);
    client.reset();
  }
});

net
  .createServer((socket) => {
    globalSocket = socket;

    clients.set(socket, new Client());

    socket.on("data", async (data) => {
      const client = clients.get(globalSocket);
      if (!client) {
        return;
      }

      console.log("here");

      const ready = client.handlePacket(data, Header);

      if (!ready) {
        console.log("not ready", client);
        return;
      }

      console.log(client);

      if (client.header.service === "userservice") {
        //const parsedPayload = payload.parseProto(AllInOneLoginReq);

        /*socket.write(
          await buildPacket(
            "ServerHeader",
            "AllInOneLoginResp",
            AllInOneLoginResp,
            {
              id: "1",
              timestamp: Date.now(),
              tokenId: header.rpc,
            },
            {
              clide: crypto.randomUUID(),
              cinta: parsedPayload.reqAllInOneLogin.cinta,
              expiryTime: Date.now() + 100000000,
              authenticationTicket:
                "VCS1axRWJeq4jFJdpI3RFfnaIPjAV3ksi8W3cc3VYedwSiQFozfoIZpRN663Tmn4oswsBRTRcz6r8E+aDLuhDzh6xg/vB0e6SqjD2fpd/N1oY/4ulGb8qQ4qc2cGwuS4dPAPnGFW1WjP7SZ3MRJI0WRo2iHbz5Qlg21ssolAo0MTDWYPh0dtYg==",
            }
          )
        );*/

        client.reset();
        saClient.write(data);
      } else if (client.header.service === "cmsservice") {
        client.reset();
        saClient.write(data);
        /*socket.write(
          await buildPacket(
            "ServerHeader",
            "CMSSyncResp",
            CMSSyncResp,
            {
              id: "1",
              timestamp: Date.now(),
              tokenId: header.rpc,
            },
            {
              serverTime: Date.now(),
            }
          )
        );*/
      } else if (client.header.service === "gameservice") {
        client.reset();
        saClient.write(data);
        //const processedPayload = payload.parseProto(StartSharplaSessionReq);

        //process.exit();
      } else {
        //console.log(header.service);
        //console.log(header);
        //console.log(payload);
        process.exit();
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

function preparePacket<T extends Record<string, string | number>>(
  body: T,
  replacements: { [K in keyof T]?: T[K] }
) {
  for (const key in body) {
    if (key in replacements) {
      body[key] = replacements[key as keyof T] as T[typeof key];
    }
    if (typeof body[key] === "object") {
      preparePacket(body[key], replacements);
    }
  }
}

async function buildPacket(
  headerFile: string,
  responseFile: string,
  payloadProto: any,
  headerReplacements: Record<string, any>,
  payloadReplacements: Record<string, any>
) {
  console.log("handling custom server packet");

  const headerJson = JSON.parse(
    (await fs.readFile(`./protobuf/responses/${headerFile}.json`)).toString()
  );

  const responseJson = JSON.parse(
    (await fs.readFile(`./protobuf/responses/${responseFile}.json`)).toString()
  );

  preparePacket(headerJson, headerReplacements);
  preparePacket(responseJson, payloadReplacements);

  console.log("resp", responseJson);

  const preparedHeader = new ProtobufHandler("WRITE").writeProto(
    headerJson,
    ServerHeader
  );
  const preparedPayload = new ProtobufHandler("WRITE").writeProto(
    responseJson,
    payloadProto
  );

  const packetHandler = new ProtobufHandler("WRITE");
  packetHandler.writeIntBE(preparedHeader.length + preparedPayload.length + 4);
  packetHandler.writeIntBE(preparedHeader.length);
  packetHandler.writeBuffer(preparedHeader);
  packetHandler.writeBuffer(preparedPayload);

  await fs.writeFile("./final.txt", packetHandler.getUsed());

  return packetHandler.getUsed();
}
