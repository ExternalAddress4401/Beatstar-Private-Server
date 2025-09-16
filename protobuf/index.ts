import fs from "fs";
import { ProtobufHandler } from "./ProtobufHandler";
import { SendAnalyticEventReq } from "./protos/SendAnalyticEventReq";
import { ServerClientMessageHeaderMap } from "./protos/ServerClientMessageHeader";
import { SendAnalyticEventResp } from "./protos/SendAnalyticEventResp";
import { ClientServerMessageHeaderMap } from "./protos/ClientServerMessageHeader";
import { SubscribeReq } from "./protos/SubscribeReq";

(async () => {
  const handler = new ProtobufHandler("READ", fs.readFileSync("./8"));

  const packetLength = handler.readIntBE();
  const headerLength = handler.readIntBE();
  const payloadLength = packetLength - 4 - headerLength;
  const header = new ProtobufHandler("READ", handler.slice(headerLength));
  const payload = new ProtobufHandler("READ", handler.slice(payloadLength));

  header.process();

  const h = header.parseProto(ServerClientMessageHeaderMap);

  if (h.compressed) {
    await payload.decompress();
  }

  payload.process();

  const p = payload.parseProto(SendAnalyticEventResp);

  console.log(
    JSON.stringify(p, (_, v) => (typeof v === "bigint" ? v.toString() : v), 2)
  );
})();
