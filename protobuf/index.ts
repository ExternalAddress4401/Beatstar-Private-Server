import fs from "fs";
import { CMSMap } from "./tools/CMSMap";
import { ProtobufHandler } from "./ProtobufHandler";
import { stringify } from "../utilities/stringify";
import { ScalingConfigProto } from "./protos/cms/ScalingConfigProto";
import { SyncResp } from "./protos/SyncResp";

/*(async () => {
  const cmsFiles = fs
    .readdirSync("../express/raw")
    .filter((el) => el === "NotificationConfig");
  for (const file of cmsFiles) {
    const data = fs.readFileSync(`../express/raw/${file}`);
    const proto = CMSMap[file];

    const handler = new ProtobufHandler("READ", data);
    handler.process();

    const json = handler.parseProto(proto);
    console.log(json);
    fs.writeFileSync(`../express/output/${file}`, stringify(json));
  }
})();*/

(async () => {
  const scaling = fs.readFileSync("./protobuf/tests/files/Profile.bytes");
  const handler = new ProtobufHandler("READ", scaling);
  handler.process();

  const json = handler.parseProto(SyncResp);

  const a = await new ProtobufHandler("WRITE").writeProto(json, SyncResp);
})();
