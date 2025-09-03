import fs from "fs";
import { ProtobufHandler } from "./ProtobufHandler";
import { SyncResp } from "./protos/SyncResp";

(async () => {
  const numberRegex = /^-?\d+n$/;

  const b = JSON.parse(
    fs.readFileSync("./responses/SyncResp.json").toString(),
    (_, v) =>
      typeof v === "string" && numberRegex.test(v) && v.endsWith("n")
        ? BigInt(v.slice(0, -1))
        : v
  );

  const handler = await new ProtobufHandler("WRITE").writeProto(
    b,
    SyncResp,
    true
  );

  console.log(handler);

  console.log("len", handler.buffer.length);

  const z = new ProtobufHandler("READ", handler);
  console.log("z", z);
  await z.decompress();
  console.log(z);
})();
