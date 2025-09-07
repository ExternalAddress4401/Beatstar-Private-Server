import * as fs from "fs";
import { ProtobufHandler } from "../ProtobufHandler";
import { SongConfigProto } from "../protos/cms/SongConfigProto";
import path from "path";

test("it produces identical SongConfigs", async () => {
  const original = fs.readFileSync(
    path.join(__dirname, "files", "SongConfig.bytes")
  );

  const handler = new ProtobufHandler("READ", original);
  handler.process();

  const json = handler.parseProto(SongConfigProto);
  const built = await new ProtobufHandler("WRITE").writeProto(
    json,
    SongConfigProto
  );

  expect(original).toEqual(built);
});
