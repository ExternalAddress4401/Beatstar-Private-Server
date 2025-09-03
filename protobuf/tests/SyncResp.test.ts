import * as fs from "fs";
import { ProtobufHandler } from "../ProtobufHandler";
import { SyncResp } from "../protos/SyncResp";

test("it produces identical SyncResps", async () => {
  const original = fs.readFileSync("./protobuf/tests/files/Profile.bytes");

  const handler = new ProtobufHandler("READ", original);
  handler.process();

  const json = handler.parseProto(SyncResp);

  fs.writeFileSync(
    "./a.txt",
    JSON.stringify(
      json,
      (_, v) => (typeof v === "bigint" ? v.toString() + "n" : v),
      2
    )
  );

  const built = await new ProtobufHandler("WRITE").writeProto(json, SyncResp);

  console.log("saved");

  expect(original).toEqual(built);
});
