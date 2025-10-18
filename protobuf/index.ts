import fs from "fs";
import { CMSMap } from "./tools/CMSMap";
import { ProtobufHandler } from "./ProtobufHandler";
import crypto from "crypto";
import zlib from "zlib";
import { LiveOpsTrackSkinConfigProto } from "./protos/cms/LiveOpsTrackSkinConfigProto";

(async () => {
  const files = fs.readdirSync("../express/raw");
  const out = [];
  for (const file of files) {
    const name = file.split(".")[0];
    console.log(name);
    const data = fs.readFileSync(`../express/raw/${file}`);

    const handler = new ProtobufHandler("READ", data);
    handler.process();

    const json = handler.parseProto(CMSMap[name]);

    out.push({
      name,
      data: json,
      gzip: zlib.gzipSync(data),
      hash: crypto.createHash("md5").update(data).digest().toString("hex"),
    });
  }

  fs.writeFileSync("../cms.json", JSON.stringify(out, null, 2));
})();
