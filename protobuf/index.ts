import fs from "fs";
import { ProtobufHandler } from "./ProtobufHandler";
import { SyncResp } from "./protos/SyncResp";

(async () => {
  const b = fs.readFileSync("./profile");
  const handler = new ProtobufHandler("READ", b);
  handler.process();

  const r = handler.parseProto(SyncResp);
  fs.writeFileSync(
    "./a.txt",
    JSON.stringify(
      r.body.profile.test.liveOpsSeasonConfig,
      (_, v) => (typeof v === "bigint" ? v.toString() : v),
      2 // <-- pretty print with 2 spaces
    )
  );
})();

function preparePacket<T extends Record<string, string | number>>(
  body: T,
  replacements: { [K in keyof T]?: T[K] }
) {
  for (const key in body) {
    if (key in replacements) {
      body[key] = replacements[key as keyof T] as T[typeof key];
      console.log(key);
    }
    if (typeof body[key] === "object") {
      preparePacket(body[key], replacements);
    }
  }
}
