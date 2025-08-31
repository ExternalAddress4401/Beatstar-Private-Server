import fs from "fs";
import { ProtobufHandler } from "./ProtobufHandler";
import { proto } from "./protos/StartSharplaSessionResp";

(async () => {
  const b = fs.readFileSync("./profile");
  const handler = new ProtobufHandler("READ", b);
  handler.process();

  const r = handler.parseProto(proto);
  console.log(r.requests.profile);
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
