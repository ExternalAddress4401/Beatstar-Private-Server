import * as fs from "fs";
import { ProtobufHandler } from "../ProtobufHandler";
import { SyncResp } from "../protos/SyncResp";
import path from "path";
import { stringify } from "../../utilities/stringify";

test("it produces identical SyncResps", async () => {
  const original = fs.readFileSync(
    path.join(__dirname, "files", "Profile.bytes")
  );

  const handler = new ProtobufHandler("READ", original);
  handler.process();

  const json = handler.parseProto(SyncResp);

  const built = await new ProtobufHandler("WRITE").writeProto(json, SyncResp);

  fs.writeFileSync("./out.b", built);

  expect(original).toEqual(built);
});
