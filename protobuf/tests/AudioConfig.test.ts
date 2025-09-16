import * as fs from "fs";
import { ProtobufHandler } from "../ProtobufHandler";
import { AudioConfigProto } from "../protos/cms/AudioConfigProto";
import path from "path";

test("it produces identical AudioConfigs", async () => {
  const original = fs.readFileSync(
    path.join(__dirname, "files", "AudioConfig.bytes")
  );

  const handler = new ProtobufHandler("READ", original);
  handler.process();

  const json = handler.parseProto(AudioConfigProto);
  const built = await new ProtobufHandler("WRITE").writeProto(
    json,
    AudioConfigProto
  );

  expect(original).toEqual(built);
});
