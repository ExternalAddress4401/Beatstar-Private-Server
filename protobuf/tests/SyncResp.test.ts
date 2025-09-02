import * as fs from "fs";
import { ProtobufHandler } from "../ProtobufHandler";
import { SyncResp } from "../protos/SyncResp";

test("it produces identical SyncResps", () => {
  const original = fs.readFileSync("./protobuf/tests/files/Profile.bytes");

  const handler = new ProtobufHandler("READ", original);
  handler.process();

  const json = handler.parseProto(SyncResp);

  fs.writeFileSync(
    "./a.txt",
    JSON.stringify(
      json.body.profile.liveOpsSeasonConfig,
      (_, v) => (typeof v === "bigint" ? v.toString() : v),
      2 // <-- pretty print with 2 spaces
    )
  );

  const built = new ProtobufHandler("WRITE").writeProto(json, SyncResp);

  fs.writeFileSync("./broke", built);

  console.log("saved");

  expect(original).toEqual(built);
});
