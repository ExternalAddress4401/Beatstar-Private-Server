import fs from "fs";
import { ProtobufHandler } from "./ProtobufHandler";
import { ClientServerMessageHeaderMap } from "./protos/ClientServerMessageHeader";
import { BatchRequest } from "./protos/BatchRequest";

(async () => {
  const handler = new ProtobufHandler("READ", fs.readFileSync("./7"));

  const packetLength = handler.readIntBE();
  const headerLength = handler.readIntBE();
  const payloadLength = packetLength - 4 - headerLength;
  const header = new ProtobufHandler("READ", handler.slice(headerLength));
  const payload = new ProtobufHandler("READ", handler.slice(payloadLength));

  header.process();

  const h = header.parseProto(ClientServerMessageHeaderMap);

  if (h.compressed) {
    await payload.decompress();
  }

  payload.process();

  const p = payload.parseProto(BatchRequest);

  console.log(p.requests);
  /*console.log(
    JSON.stringify(
      p.requests,
      (_, v) => (typeof v === "bigint" ? v.toString() : v),
      2
    )
  );*/
})();
